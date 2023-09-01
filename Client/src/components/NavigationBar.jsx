import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToolBar } from ".";

const NavigationBar = () => {
    return (
        <Navigation>
            <ArticleTitle>
                <Link to="/home">
                    <ImgIcon src="/icon.svg" alt="mainIcon" />
                </Link>
                <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
                    <H1>Game Universe</H1>
                </Link>
            </ArticleTitle>
            <ArticleToolBar>
                <ToolBar />
            </ArticleToolBar>
        </Navigation>
    );
};

const Navigation = styled.nav`
    border-radius: 5px;
    display: flex;
    align-items: center;
    font-weight: bold;

    // Keep It For Design Testing
    /* background: rgba(255, 255, 255, 0.4); */
`;

const Article = styled.article` display: flex; `;

const ArticleTitle = styled(Article)`
    width: 40%;
    justify-content: left;
`;

const ArticleToolBar = styled(Article)`
    width: 60%;
    justify-content: right;
`;

const ImgIcon = styled.img`
    height: 40px;
    margin-right: 10px;
    margin-bottom: 0px;
`;

const H1 = styled.h1`
    margin-top: 7px;
    margin-bottom: 0px;
    height: 25px;
    font-size: 33px;
    display: flex;
    align-items: center;
    color: white;
    text-shadow: 0 0 10px black;
`;

export default NavigationBar;