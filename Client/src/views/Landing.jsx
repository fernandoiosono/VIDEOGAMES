import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (<>
        <h1>Welcome To Game Universe!</h1>
        <ButtonHome onClick={() => navigate("/home")}>Go Home</ButtonHome>
    </>);
};

const ButtonHome = styled.button`
    font-weight: bold;
    border: 2px solid black;
    border-radius: 5px;
    height: 30px;
    width: 100px;

    &:hover {
        background-color: white;
        cursor: pointer;
    }
`;

export default Landing;