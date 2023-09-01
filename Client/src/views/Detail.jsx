import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setNavFather } from "../redux/actions.js";
import { NavigationBar, GameDetail } from "../components";

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(setNavFather('detail'));
        // dispatch(setCharacterDetail(id));

        // return () => { dispatch(cleanDetail()); };
    }, [id]);

    return (<>
        <NavigationBar />
        <GameDetail />
    </>);
};

export default Detail;