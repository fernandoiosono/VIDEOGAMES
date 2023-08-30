import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAllGenres, setAllPlatforms } from "../redux/actions.js";

const Landing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAllGenres());
        dispatch(setAllPlatforms());
    }, []);

    return (
        <SectionLanding>
            <H1Welcome>Welcome To Game Universe!</H1Welcome>
            <ButtonHome onClick={() => navigate("/home")}>Go Home</ButtonHome>
        </SectionLanding>
    );
};

const SectionLanding = styled.section`
    padding-top: 30%;  
`;

const H1Welcome = styled.h1`
    text-shadow: 0 0 10px black;
    font-size: 40px;
    color: white;
    margin-bottom: 15px;
`;

const ButtonHome = styled.button`
    font-weight: bold;
    border: 2px solid black;
    border-radius: 5px;
    height: 30px;
    width: 100px;
    box-shadow: 0 0 10px black;

    &:hover {
        box-shadow: 0 0 10px white;
        background-color: white;
        cursor: pointer;
    }
`;

export default Landing;