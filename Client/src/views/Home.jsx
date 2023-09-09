import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllGames, setNavFather } from "../redux/actions.js";
import { NavigationBar, GameCards } from "../components";

const Home = () => {
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.allGames);

    useEffect(() => {
        dispatch(setNavFather('home'));
        dispatch(setAllGames());
    }, []);

    return (<>
        <NavigationBar />
        <GameCards />
    </>);
};

export default Home;