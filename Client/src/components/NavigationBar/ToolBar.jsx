import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { SearchBar, NewGameButton, HomeButton } from "..";

const ToolBar = () => {
    let viewCaption = "";
    const currentView = useSelector((state) => state.currentView);
    
    switch (currentView) {
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
                currentView === "home" 
                    ? ( <SearchBar /> ) 
                    : null
            }
            {
                currentView === "home" || currentView === "detail" 
                    ? ( <NewGameButton /> ) 
                    : null
            }
            {
                currentView === "detail" || currentView === "newGame" 
                    ? ( <HomeButton /> ) 
                    : null
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