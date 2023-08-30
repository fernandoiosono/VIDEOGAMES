import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Nav, GameCards } from "../components";
import { useDispatch } from "react-redux";
import { setNavFather } from "../redux/actions.js";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setNavFather('home'));
    }, []);

    return (<>
        <Nav />
        <GameCards />
    </>);
};

export default Home;