import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { NEW_GAME } from "./viewCaptions.js";
import { setCurrentView } from "../redux/actions.js";
import { NavigationBar, NewGameForm } from "../components";

const NewGame = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentView(NEW_GAME));
    }, []);

    return (
        <SectionView>
            <NavigationBar />
            <NewGameForm />
        </SectionView>
    );
};

const SectionView = styled.div`
    height: calc(100vh - 40px);
`;

export default NewGame;