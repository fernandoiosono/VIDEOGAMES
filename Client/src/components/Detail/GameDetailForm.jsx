import styled from "styled-components";
import { useState, useEffect } from "react";
import star from "../../assets/img/star.svg";
import unstar from "../../assets/img/unstar.svg";
import { useSelector, useDispatch } from "react-redux";
import { setAllGenres, setAllPlatforms } from "../../redux/actions.js";

const GameDetailForm = () => {
    const dispatch = useDispatch();

    const allGenres = useSelector((state) => state.allGenres);
    const allPlatforms = useSelector((state) => state.allPlatforms);
    const gameData = useSelector((state) => state.gameDetail)

    const handleCheckKeyDown = (e) => {
        if (e.key === " ") e.preventDefault();
    };

    useEffect(() => {
        // Recargamos Géneros y Plataformas si está vacío el estado global
        if (!allGenres.length) dispatch(setAllGenres());
        if (!allPlatforms.length) dispatch(setAllPlatforms());
    }, []);

    return (
        <FormNewGame>
            <LeftAside>
                <TitleGroup>Name</TitleGroup>
                <TextAName readOnly name="name" defaultValue={gameData.name} autoComplete="off" />
                <TitleGroup>Description</TitleGroup>
                <TextADescription readOnly name="description" defaultValue={gameData.description} autoComplete="off" />
                <TitleGroup>Rating</TitleGroup>
                <DivRating>
                    <ImgRating src={(gameData.rating >= 1) ? star : unstar} alt="rating1" />
                    <ImgRating src={(gameData.rating >= 2) ? star : unstar} alt="rating2" />
                    <ImgRating src={(gameData.rating >= 3) ? star : unstar} alt="rating3" />
                    <ImgRating src={(gameData.rating >= 4) ? star : unstar} alt="rating4" />
                    <ImgRating src={(gameData.rating >= 5) ? star : unstar} alt="rating5" />
                </DivRating>
            </LeftAside>
            <CenterAside>
                <TitleGroup>Image URL</TitleGroup>
                <DivImage>
                    <ImgGame src={gameData.image} />
                </DivImage>
                <TextAURL readOnly name="image" defaultValue={gameData.image} autoComplete="off"/>
                <DivReleased>
                    <TitleGroup>Released</TitleGroup>
                    <TextAReleased readOnly name="released" defaultValue={gameData.released} autoComplete="off"/>
                </DivReleased>
            </CenterAside>
            <HiddenAside>
                <ArticleChecks>
                    <TitleGroup>Genres</TitleGroup>
                    <DivScroll>
                        {allGenres.map(({idGenre, name, slug}) => (
                            <div key={`chkgenre-${slug}`}>
                                <CheckBox readOnly
                                    type="checkbox" 
                                    id={`genres-${slug}`}
                                    defaultChecked={gameData.genres && gameData.genres.includes(idGenre)}
                                    onKeyDown={handleCheckKeyDown} />
                                <LabelCheck htmlFor={`genres-${slug}`}>{name}</LabelCheck>
                                <br />
                            </div>
                        ))}
                    </DivScroll>
                </ArticleChecks>
                <ArticleChecks>
                    <TitleGroup>Platforms</TitleGroup>
                    <DivScroll>    
                        {allPlatforms.map(({idPlatform, name, slug}) => (
                            <div key={`chkplatform-${slug}`}>
                            <CheckBox readOnly
                                type="checkbox" 
                                id={`platforms-${slug}`}
                                defaultChecked={gameData.platforms && gameData.platforms.includes(idPlatform)}
                                onKeyDown={handleCheckKeyDown} />
                            <LabelCheck htmlFor={`platforms-${slug}`}>{name}</LabelCheck>
                            <br />
                        </div>
                        ))}
                    </DivScroll>
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

const DisplayedAside = styled.aside`
    overflow: hidden;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);

    display: grid;
    grid-gap: 10px;
`;

const LeftAside = styled(DisplayedAside)`
    grid-template-rows: auto auto auto 1fr auto auto;
`;

const CenterAside = styled(DisplayedAside)`
    grid-template-rows: auto 1fr auto auto;
`;

const HiddenAside = styled.aside`
    overflow: hidden;
    background-color: transparent;

    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 10px;
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

const DivReleased = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px  
`;

const DivScroll = styled(Div)`
    padding: 10px;
    overflow: auto;
`;

const ImgRating = styled.img`
    height: 40px;
    filter: drop-shadow(-2px 2px 2px rgba(0, 0, 0, 0.7));
`;

const ImgGame = styled.img`
    max-width: 100%;
    max-height: 100%;

    border-radius: 5px;
    box-shadow: 0 0 5px black;
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

const TextAReleased = styled(TextArea)`
    height: 14px;
    width: 100%;
    font-size: 12px;
    text-align: center;
`;

const ArticleChecks = styled.article`
    padding: 10px;
    overflow: hidden;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);

    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 10px;
`;

const CheckBox = styled.input`
    pointer-events: none;

    &:focus { outline: none; }
`;

const LabelCheck = styled.label`
    pointer-events: none;
`;

export default GameDetailForm;