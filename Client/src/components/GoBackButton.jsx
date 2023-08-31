import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
	const navigate = useNavigate();

    return (
        <ButtonBack onClick={() => navigate(-1)}>Go Back</ButtonBack>
    );
};

const ButtonBack = styled.button`
	height: 35px;
	width: 100px;
	border: none;
	border-radius: 5px;
	background-color: #c13b24;
	color: white;
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

export default GoBackButton;