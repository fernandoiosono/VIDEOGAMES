import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const GameCard = (props) => {
    const navigate = useNavigate();
    const { idGame, name, image, rating, genres } = props.args;

    const handleClick = (idGame) => {
        navigate(`/gamedetail/${idGame}`);
    };

    return (
        <Card key={ idGame } $imageurl={ image } onClick={ () => handleClick(idGame) }>
                <PName>{ name }</PName>
        </Card>
    );
};

const Card = styled.div`
    margin: 10px;
    border-radius: 5px;
    width: calc(20% - 20px);
    height: calc(33% - 20px);
    
    background-image: url(${ props => props.$imageurl });
    background-size: cover;
    background-position: center center;

    display: flex;
    align-items: flex-end;
    justify-content: center;

    box-shadow: 0 0 15px black;

    &:hover { 
		cursor: pointer;
		box-shadow: 0 0 5px black;
	}
`;

const PName = styled.p`
    margin: 0;
    width: 100%;
    padding: 9px;
    border-radius: 0 0 5px 5px;
    background-color: rgba(0, 0, 0, 0.6);
    
    color: white;
    font-size: 12px;
    text-align: center;
    text-shadow: 0 0 14px white;
`;

export default GameCard;