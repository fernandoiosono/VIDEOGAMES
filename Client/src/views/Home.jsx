import { useEffect } from "react";
import { HOME } from "./viewCaptions.js";
import { styled } from "styled-components";
import { setAllGames, setCurrentView } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { NavigationBar, GameCards } from "../components";

const Home = () => {
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.allGames);

    useEffect(() => {
        dispatch(setCurrentView(HOME));

        if (!allGames.length) dispatch(setAllGames());
    }, []);

    return (
        <SectionView>
            <NavigationBar />
            <GameCards />
        </SectionView>
    );
};

const SectionView = styled.section`
    height: calc(100vh - 40px);
`;

export default Home;