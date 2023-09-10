import styled from "styled-components";
import { useState, useEffect } from "react";
import star from "../../assets/img/star.svg";
import unstar from "../../assets/img/unstar.svg";
import { addNewGame, setAllGames } from "../../redux/actions.js";
import { useSelector, useDispatch } from "react-redux";
import { setAllGenres, setAllPlatforms } from "../../redux/actions.js";
import { errorNewGameForm, isValidURL, validateNewGameData } from "../../helpers";

const NewGameForm = () => {
    const dispatch = useDispatch();

    const allGenres = useSelector((state) => state.allGenres);
    const allPlatforms = useSelector((state) => state.allPlatforms);

    const initGameData = { 
        name: "", 
        description: "", 
        image: "", 
        rating: 0, 
        genres: [], 
        platforms: [] };

    const [errors, setErrors] = useState({ 
        name: "", 
        description: "", 
        image: "", 
        rating: "", 
        genres: "", 
        platforms: "" });

    const [gameData, setGameData] = useState(initGameData);

    const handleInputChange = (e) => { // Name, Description, Image URL
		const property = e.target.name,
			value = e.target.value;

		// De ésta forma usamo una copia actualizada del estado
		const gameDataUpdated = { ...gameData, [property]: value };

		setGameData(gameDataUpdated);
		validateNewGameData(gameDataUpdated, property, setErrors, errors);
	};

    const handleRatingChange = (rating) => {
        const gameDataUpdated = { ...gameData, rating: rating };

        setGameData(gameDataUpdated);
        validateNewGameData(gameDataUpdated, "rating", setErrors, errors);
    };

    const handleCheckChange = (e) => {
        let gameDataUpdated = {};

        const property = e.target.id.split('-')[0];
        const value = parseInt(e.target.value, 10);

        if (e.target.checked) {
            gameDataUpdated = { ...gameData, [property]: [ ...gameData[property], value ] };
        } else {
            gameDataUpdated = { ...gameData, [property]: [...gameData[property].filter((id) => id !== value)] };
        }

        setGameData(gameDataUpdated);
        validateNewGameData(gameDataUpdated, property, setErrors, errors);
    };

    const handlePasteClipboard = () => {
        navigator.clipboard.readText().then((pastedText) => {
            if (isValidURL(pastedText)) {
                const gameDataUpdated = { ...gameData, image: pastedText }

                setGameData(gameDataUpdated);
                validateNewGameData(gameDataUpdated, "image", setErrors, errors);
            }
        });
    };

    const handleSubmit = (e) => {
		e.preventDefault();

		const errorForm = errorNewGameForm(gameData, errors);

		if (!errorForm) {
            dispatch(addNewGame(gameData))
                .then(() => {
                    dispatch(setAllGames());

                    setGameData(initGameData);
                })
                .catch((error) => {
                    
                });
		} else {
			alert(errorForm);
		}
	};

    useEffect(() => {
        // Recargamos Géneros y Plataformas si está vacío el estado global
        if (!allGenres.length) dispatch(setAllGenres());
        if (!allPlatforms.length) dispatch(setAllPlatforms());
    }, []);

    return (
        <FormNewGame onSubmit={handleSubmit}>
            <MainAside>
                <TitleGroup>Name</TitleGroup>
                <TextAName name="name" value={gameData.name} onChange={handleInputChange} autoComplete="off" />
                <PError>{errors.name}</PError>
                <TitleGroup>Description</TitleGroup>
                <TextADescription name="description" value={gameData.description} onChange={handleInputChange} autoComplete="off"/>
                <PError>{errors.description}</PError>
                <TitleGroup>Rating</TitleGroup>
                <DivRating>
                    <ImgRating src={(gameData.rating >= 1) ? star : unstar} alt="rating1" onClick={() => handleRatingChange(1)} />
                    <ImgRating src={(gameData.rating >= 2) ? star : unstar} alt="rating2" onClick={() => handleRatingChange(2)} />
                    <ImgRating src={(gameData.rating >= 3) ? star : unstar} alt="rating3" onClick={() => handleRatingChange(3)} />
                    <ImgRating src={(gameData.rating >= 4) ? star : unstar} alt="rating4" onClick={() => handleRatingChange(4)} />
                    <ImgRating src={(gameData.rating >= 5) ? star : unstar} alt="rating5" onClick={() => handleRatingChange(5)} />
                </DivRating>
                <PError>{errors.rating}</PError>
                <ButtonSave type="submit">Save</ButtonSave>
            </MainAside>
            <AsideLeft>
                <ArticleImg>
                    <TitleGroup>Image URL</TitleGroup>
                    <DivImage>
                        <ImgGame src={gameData.image} />
                    </DivImage>
                    <FooterImage>
                        <TextAURL type="text" name="image" readOnly value={gameData.image} onChange={handleInputChange} autoComplete="off" />
                        <ButtonPaste type="button" onClick={handlePasteClipboard}>Paste</ButtonPaste>
                    </FooterImage>
                    <PError>{errors.image}</PError>
                </ArticleImg>
            </AsideLeft>
            <AsideRight>
                <ArticleGen>
                    <TitleGroup>Genres</TitleGroup>
                    <DivScroll>
                        {allGenres.map(({idGenre, name, slug}) => (
                            <div key={`chkgenre-${slug}`}>
                                <input type="checkbox" 
                                    // key={slug} 
                                    id={`genres-${slug}`} // Don´t Change This Structure (handleCheckChange > type Variable)
                                    value={idGenre}
                                    checked={gameData.genres.includes(idGenre)}
                                    onChange={handleCheckChange} />
                                <label htmlFor={`genres-${slug}`}>{name}</label>
                                <br />
                            </div>
                        ))}
                    </DivScroll>
                    <PError>{errors.genres}</PError>
                </ArticleGen>
                <ArticleGen>
                    <TitleGroup>Platforms</TitleGroup>
                    <DivScroll>    
                        {allPlatforms.map(({idPlatform, name, slug}) => (
                            <div key={`chkplatform-${slug}`}>
                                <input type="checkbox" 
                                    // key={slug} 
                                    id={`platforms-${slug}`} // Don´t Change This Structure (handleCheckChange > type Variable)
                                    value={idPlatform}
                                    checked={gameData.platforms.includes(idPlatform)}
                                    onChange={handleCheckChange} />
                                <label htmlFor={`platforms-${slug}`}>{name}</label>
                                <br />
                            </div>
                        ))}
                    </DivScroll>
                    <PError>{errors.platforms}</PError>
                </ArticleGen>
            </AsideRight>
        </FormNewGame>
    );
};

const FormNewGame = styled.form`
    overflow: hidden;
    padding: 0 120px 0 120px;
    height: calc(100vh - 98px);
    
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
`;

const MainAside = styled.main`
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);

    display: grid;
    grid-template-rows: auto auto auto auto 1fr auto auto auto auto auto;
    grid-gap: 10px;
`;

const ButtonSave = styled.button`
	height: 35px;
	width: 100%;
	border: none;
	border-radius: 5px;
	background-color: green;
	color: white;
	font-weight: bold;
	font-size: 11px;
	box-shadow: 0 0 5px black;
	text-shadow: 0 0 15px white;
    margin: 0 auto;

	&:hover { 
		cursor: pointer;
		box-shadow: 0 0 5px white;
	}
`;

const PError = styled.p`
	font-size: 10px;
	background-color: #c52727;
	color: white;
	margin: 0;
    border-radius: 2px;
    text-align: center;
`;

const ButtonPaste = styled.button`
    width: 60px;
	border: none;
	border-radius: 5px;
	background-color: #4d6bda;
	color: white;
	font-weight: bold;
	font-size: 10px;
	box-shadow: 0 0 5px black;
	text-shadow: 0 0 15px white;

	&:hover { 
		cursor: pointer;
		box-shadow: 0 0 5px white;
	}
`;

const Aside = styled.aside`
    overflow: hidden;
    background-color: transparent;

    display: grid;
    grid-gap: 10px;
`;

const AsideLeft = styled(Aside)`
    grid-template-rows: 1fr;
`;

const AsideRight = styled(Aside)`
    grid-template-rows: repeat(2, 1fr);
`;

const Article = styled.article`
    padding: 10px;
    overflow: hidden;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);
    display: grid;
    grid-gap: 10px;
`;

const ArticleImg = styled(Article)`
    grid-template-rows: auto 1fr auto auto;
`;

const ArticleGen = styled(Article)`
    grid-template-rows: auto 1fr auto;
`;

const Paragraph = styled.p`
    margin: 0;
    color: white;
    font-size: 20px;
    text-shadow: 0 0 5px black;
    font-weight: bold;
`;

const TitleGroup = styled(Paragraph)``;

const FooterImage = styled.footer`    
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
`;

const DivRating = styled.div`
    padding: 20px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.7);

    display: flex;
    flex-direction: row;
    gap: 15px;
    justify-content: center;
    
    border-radius: 5px;
    box-shadow: 0 0 5px black;
`;

const DivImage = styled.div`
    padding: 10px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.7);
    
    border-radius: 5px;
    box-shadow: 0 0 5px black;
`;

const DivScroll = styled.div`
    padding: 10px;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.7);
    
    border-radius: 5px;
    box-shadow: 0 0 5px black;
`;

const ImgRating = styled.img`
    height: 40px;
    filter: drop-shadow(-2px 2px 2px rgba(0, 0, 0, 0.7));
    &:hover { cursor: pointer; }  
`;

const ImgGame = styled.img`
    max-width: 100%;
    max-height: 100%;

    border-radius: 5px;
    box-shadow: 0 0 5px black;
`;

const TextAURL = styled.textarea`
    height: 100px;
    border: none;
    border-radius: 5px;
    resize: none;
    box-shadow: 0 0 5px black;
    padding: 10px;
    font-size: 10px;
    background-color: rgba(255, 255, 255, 0.7);

    &:focus { outline: none; }
`;

const TextAName = styled.textarea`
    height: 70px;
    border: none;
    border-radius: 5px;
    resize: none;
    box-shadow: 0 0 5px black;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.7);

    &:focus { outline: none; }
`;

const TextADescription = styled.textarea`
    border: none;
    border-radius: 5px;
    resize: none;
    box-shadow: 0 0 5px black;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.7);

    &:focus { outline: none; }
`;

export default NewGameForm;