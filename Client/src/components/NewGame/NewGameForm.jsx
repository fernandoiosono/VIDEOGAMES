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
            <LeftAside>
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
            </LeftAside>
            <CenterAside>
                <TitleGroup>Image URL</TitleGroup>
                <DivImage>
                    <ImgGame src={gameData.image} />
                </DivImage>
                <FooterURL>
                    <TextAURL type="text" name="image" readOnly value={gameData.image} onChange={handleInputChange} autoComplete="off" />
                    <ButtonPaste type="button" onClick={handlePasteClipboard}>Paste</ButtonPaste>
                </FooterURL>
                <PError>{errors.image}</PError>
            </CenterAside>
            <HiddenAside>
                <ArticleChecks>
                    <TitleGroup>Genres</TitleGroup>
                    <DivScroll>
                        {allGenres.map(({idGenre, name, slug}) => (
                            <div key={`chkgenre-${slug}`}>
                                <input type="checkbox" 
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
                </ArticleChecks>
                <ArticleChecks>
                    <TitleGroup>Platforms</TitleGroup>
                    <DivScroll>    
                        {allPlatforms.map(({idPlatform, name, slug}) => (
                            <div key={`chkplatform-${slug}`}>
                                <input type="checkbox" 
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
                </ArticleChecks>
            </HiddenAside>
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

const Aside = styled.aside`
    overflow: hidden;

    display: grid;
    grid-gap: 10px;
`;

const DisplayedAside = styled(Aside)`
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);
`;

const HiddenAside = styled(Aside)`
    background-color: transparent;
    grid-template-rows: repeat(2, 1fr);
`;

const LeftAside = styled(DisplayedAside)`
    grid-template-rows: auto auto auto auto 1fr auto auto auto auto auto;
`;

const CenterAside = styled(DisplayedAside)`
    grid-template-rows: auto 1fr auto auto;
`;

const TitleGroup = styled.p`
    margin: 0;
    color: white;
    font-size: 20px;
    text-shadow: 0 0 5px black;
    font-weight: bold;
`;

const Div = styled.div`
    border-radius: 5px;
    box-shadow: 0 0 5px black;
    background-color: rgba(255, 255, 255, 0.7);
`;

const DivRating = styled(Div)`
    padding: 20px;
    overflow: hidden;
    justify-content: center;
    
    display: flex;
    flex-direction: row;
    gap: 15px;
`;

const DivImage = styled(Div)`
    padding: 10px;
    overflow: hidden;
`;

const DivScroll = styled(Div)`
    padding: 10px;
    overflow: auto;
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

const FooterURL = styled.footer`    
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
`;

const TextArea = styled.textarea`
    resize: none;
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px black;
    background-color: rgba(255, 255, 255, 0.7);

    &:focus { outline: none; }
`;

const TextAName = styled(TextArea)`
    height: 70px;
`;

const TextADescription = styled(TextArea)`
    font-size: 12px;
`;

const TextAURL = styled(TextArea)`
    height: 60px;
    font-size: 10px;
`;

const ArticleChecks = styled.article`
    padding: 10px;
    overflow: hidden;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-gap: 10px;
`;

const Button = styled.button`
    border: none;
	border-radius: 5px;
    box-shadow: 0 0 5px black;

    color: white;
    font-size: 11px;
	font-weight: bold;
    text-shadow: 0 0 15px white;

    &:hover { 
		cursor: pointer;
		box-shadow: 0 0 5px white;
	}
`;

const ButtonSave = styled(Button)`
    width: 100%;
	height: 35px;
	background-color: green;
`;

const ButtonPaste = styled(Button)`
    width: 60px;
	background-color: #4d6bda;
`;

const PError = styled.p`
	font-size: 10px;
	background-color: #c52727;
	color: white;
	margin: 0;
    border-radius: 2px;
    text-align: center;
`;

export default NewGameForm;