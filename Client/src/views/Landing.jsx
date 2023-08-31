import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
    height: 35px;
	width: 100px;
	border: none;
	border-radius: 5px;
	background-color: #886bde;
	color: white;
	font-weight: bold;
	font-size: 11px;
	margin-left: 10px;
	box-shadow: 0 0 5px black;

	&:hover { 
		cursor: pointer;
		box-shadow: 0 0 5px white;
	}
`;

export default Landing;