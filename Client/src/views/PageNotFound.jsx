import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (<>
        <h1>Page Not Found</h1>
        <ButtonBack onClick={() => navigate("/")}>Back Home</ButtonBack>
    </>);
};

const ButtonBack = styled.button`
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

export default PageNotFound;