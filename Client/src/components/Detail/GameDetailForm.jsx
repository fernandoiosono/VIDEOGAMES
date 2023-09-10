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
            <MainAside>
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
            </MainAside>
            <AsideLeft>
                <ArticleImg>
                    <TitleGroup>Image URL</TitleGroup>
                    <DivImage>
                        <ImgGame src={gameData.image} />
                    </DivImage>
                    <TextAURL readOnly name="image" defaultValue={gameData.image} autoComplete="off"/>
                    <DivReleased>
                        <TitleGroup>Released</TitleGroup>
                        <TextAReleased readOnly name="released" defaultValue={gameData.released} autoComplete="off"/>
                    </DivReleased>
                </ArticleImg>
            </AsideLeft>
            <AsideRight>
                <ArticleGen>
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
                </ArticleGen>
                <ArticleGen>
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
    grid-template-rows: auto auto auto 1fr auto auto;
    grid-gap: 10px;
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
    grid-template-rows: auto 1fr;
`;

const Paragraph = styled.p`
    margin: 0;
    color: white;
    font-size: 20px;
    text-shadow: 0 0 5px black;
    font-weight: bold;
`;

const TitleGroup = styled(Paragraph)``;

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

const DivReleased = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px  
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
`;

const ImgGame = styled.img`
    max-width: 100%;
    max-height: 100%;

    border-radius: 5px;
    box-shadow: 0 0 5px black;
`;

const TextAURL = styled.textarea`
    height: 60px;
    border: none;
    border-radius: 5px;
    resize: none;
    box-shadow: 0 0 5px black;
    padding: 10px;
    font-size: 10px;
    background-color: rgba(255, 255, 255, 0.7);

    &:focus { outline: none; }
`;

const TextAReleased = styled.textarea`
    height: 11px;
    width: 100%;
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

const CheckBox = styled.input`
    pointer-events: none;

    &:focus { outline: none; }
`;

const LabelCheck = styled.label`
    pointer-events: none;
`;

export default GameDetailForm;