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
                    <H1SiteTitle>Game Universe</H1SiteTitle>
                </Link>
            </ArticleTitle>
            <ArticleToolBar>
                <ToolBar />
            </ArticleToolBar>
        </Navigation>
    );
};

const Navigation = styled.nav`
    margin: 0;
    border-radius: 5px;    
    font-weight: bold;
    margin-bottom: 10px;

    display: flex;
    flex-direction: row;
`;

const Article = styled.article` display: flex; `;

const ArticleTitle = styled(Article)`
    flex: 1;
    align-items: center;
    gap: 10px;
`;

const ArticleToolBar = styled(Article)`
    flex: 2;
    justify-content: right;
`;

const ImgIcon = styled.img`
    height: 40px;
    
`;

const H1SiteTitle = styled.h1`
    margin: 0;
    color: white;
    font-size: 33px;
    text-shadow: 0 0 10px black;
`;

export default NavigationBar;