import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNavFather } from "../redux/actions.js";
import { NavigationBar, GameCards } from "../components";

const Home = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setNavFather('home'));
    }, []);

    return (<>
        <NavigationBar />
        <GameCards />
    </>);
};

export default Home;