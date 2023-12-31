import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllGames, setAllGenres, setAllPlatforms } from "../redux/actions.js";

const Landing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.allGames);

    useEffect(() => {
        dispatch(setAllGenres());
        dispatch(setAllPlatforms());
        dispatch(setAllGames());
    }, []);

    return (
        <SectionLanding>
            <H1Welcome>Welcome To Game Universe!</H1Welcome>
            <ButtonHome 
                disabled={!allGames.length > 0} 
                onClick={() => navigate("/home")}>
                    {
                        allGames.length === 0
                            ? "Loading..."
                            : "Go Home!"
                    }
            </ButtonHome>
        </SectionLanding>
    );
};

const SectionLanding = styled.section`
    text-align: center;
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

    &:disabled {
        pointer-events: none;
        background-color: gray;
    }
`;

export default Landing;