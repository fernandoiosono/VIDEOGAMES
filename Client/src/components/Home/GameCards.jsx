import { styled } from "styled-components";
import { GameCard } from "../../components";
import { useEffect, useState } from "react";
import { divideGamesIntoPages } from "../../helpers";
import { setAllGames } from "../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";

const gamesPerPage = parseInt(import.meta.env.VITE_GAMES_PER_PAGE);

const GameCards = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const allGames = useSelector((state) => state.allGames);

    const totalPages = Math.ceil(allGames.length / gamesPerPage);
    const paginatedGames = divideGamesIntoPages(allGames, gamesPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        if (!allGames.length) dispatch(setAllGames());
    }, []);

    return (
        <SectionGameCards>
            <DisplayedAside>
                <MainCards>
                    {paginatedGames.length > 0 && paginatedGames[currentPage].map((item, index) => (
                        <GameCard key={ index } args={ item } />
                    ))}
                </MainCards>
                <FooterCards>
                    <ButtonDirection disabled={ currentPage === 0 } onClick={ () => { handlePageChange(currentPage - 1) } }>Previous</ButtonDirection>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <ButtonNumber key={ index } onClick={ () => { handlePageChange(index) } } disabled={ currentPage === index }>
                            { index + 1 }
                        </ButtonNumber>
                    ))}
                    <ButtonDirection disabled={ currentPage === totalPages - 1 } onClick={ () => { handlePageChange(currentPage + 1) } }>Next</ButtonDirection>
                </FooterCards>
            </DisplayedAside>
            <HiddenAside>
                <ArticleFilters>
                    <TitleGroup>Filtrar</TitleGroup>
                    <MainControls />
                    <ButtonReset>Reset Filters</ButtonReset>
                </ArticleFilters>
                <ArticleFilters>
                    <TitleGroup>Ordenar</TitleGroup>
                    <MainControls />
                    <ButtonReset>Reset Order</ButtonReset>
                </ArticleFilters>
            </HiddenAside>
        </SectionGameCards>
    );
};

const SectionGameCards = styled.section`
    overflow: hidden;
    height: calc(100vh - 98px);
    
    display: grid;
    grid-template-columns: 4fr 1fr;
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
    grid-template-rows: 1fr auto;
`;

const HiddenAside = styled(Aside)`
    background-color: transparent;
    grid-template-rows: repeat(2, 1fr);
`;

const TitleGroup = styled.p`
    margin: 0;
    color: white;
    font-size: 20px;
    text-shadow: 0 0 5px black;
    font-weight: bold;
`;

const MainCards = styled.main`
    padding: 10px;
    max-width: 100%;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 0 5px black;
    background-color: rgba(255, 255, 255, 0.9);

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FooterCards = styled.footer`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
`;

const Button = styled.button`
    height: 30px;
    border: none;
	border-radius: 5px;
    box-shadow: 0 0 5px black;

    color: white;
    font-size: 11px;
	font-weight: bold;
    text-shadow: 0 0 15px black;

    &:hover { 
		cursor: pointer;
		box-shadow: 0 0 5px white;
	}

    &:disabled {
        pointer-events: none;
        background-color: gray;
        color: #3d3a3a;
    }
`;

const ButtonDirection = styled(Button)`
    width: 100px;
	background-color: #4d6bda;
`;

const ButtonNumber = styled(Button)`
    width: 50px;
	background-color: #3fc383;
`;

const ButtonReset = styled(Button)`
    width: 100%;
	background-color: #e33535;
`;

const ArticleFilters = styled.article`
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-gap: 10px;
`;

const MainControls = styled.main`
    /* background-color: rgba(58, 74, 214, 0.5); */
`

export default GameCards;