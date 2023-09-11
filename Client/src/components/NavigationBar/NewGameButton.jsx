import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NewGameButton = () => {
	const navigate = useNavigate();

    return (
        <ButtonNew onClick={() => navigate("/newgame")}>New Game</ButtonNew>
    );
};

const ButtonNew = styled.button`
	height: 35px;
	width: 100px;
	border: none;
	border-radius: 5px;
	background-color: green;
	color: white;
	font-weight: bold;
	font-size: 11px;
	box-shadow: 0 0 5px black;
	text-shadow: 0 0 15px white;

	&:hover { 
		cursor: pointer;
		box-shadow: 0 0 5px white;
	}
`;

export default NewGameButton;