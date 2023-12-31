import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { GAME_DETAIL } from "./viewCaptions.js";
import { setCurrentView, setGameDetail, cleanDetail } from "../redux/actions.js";
import { NavigationBar, GameDetailForm } from "../components";


const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(setCurrentView(GAME_DETAIL, id.toString()));

        return () => { dispatch(cleanDetail()); };
    }, []);

    useEffect(() => {
        dispatch(setGameDetail(id));
    }, [id]);

    return (
        <SectionView>
            <NavigationBar />
            <GameDetailForm />
        </SectionView>
    );
};

const SectionView = styled.div`
    height: calc(100vh - 40px);
`;

export default Detail;