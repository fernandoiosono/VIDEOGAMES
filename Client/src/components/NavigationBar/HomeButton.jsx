import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
	const navigate = useNavigate();

    return (
        <ButtonBack onClick={() => navigate("/home")}>Home</ButtonBack>
    );
};

const ButtonBack = styled.button`
	height: 35px;
	width: 100px;
	border: none;
	border-radius: 5px;
	background-color: #886bde;
	color: black;
	font-weight: bold;
	font-size: 11px;
	margin-left: 10px;
	box-shadow: 0 0 5px black;
	text-shadow: 0 0 15px white;

	&:hover { 
		cursor: pointer;
		box-shadow: 0 0 5px white;
	}
`;

export default HomeButton;