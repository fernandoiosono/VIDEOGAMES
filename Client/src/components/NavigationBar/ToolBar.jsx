import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { SearchBar, NewGameButton, HomeButton } from "..";

const ToolBar = () => {
    let viewCaption = "";
    const fatherView = useSelector((state) => state.navFather);
    
    switch (fatherView) {
        case "newGame":
            viewCaption = "@ New Game Creation";
            break;
        case "detail":
            viewCaption = "@ Game Detail";
            break;
        default:
            viewCaption = "Welcome Home!";
    }

    return (
        <SectionView>
            <PCaption>{viewCaption}</PCaption>
            {
                fatherView === "home" 
                    ? ( <SearchBar /> ) 
                    : null
            }
            {
                fatherView === "home" || fatherView === "detail" ? (
                    <NewGameButton />
                ) : null
            }
            {
                fatherView === "detail" || fatherView === "newGame" ? (
                    <HomeButton />
                ) : null
            }
        </SectionView>
    );
};

const SectionView = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`;

const PCaption = styled.p`
    color: white;  
    text-shadow: 0 0 10px black;
    margin-right: 10px;
`;

export default ToolBar;