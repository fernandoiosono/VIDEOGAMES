import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigationBar, NewGameForm } from "../components";
import { setNavFather } from "../redux/actions.js";

const NewGame = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setNavFather('newGame'));
    }, []);

    return (<>
        <NavigationBar />
        <NewGameForm />
    </>);
};

export default NewGame;