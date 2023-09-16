import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { SearchBar, NewGameButton, HomeButton } from "..";
import * as viewCaption from "../../views/viewCaptions.js";

const ToolBar = () => {
    const currentView = useSelector((state) => state.currentView);

    const caption = currentView.caption + ((!currentView.payload) ? "" : currentView.payload);

    return (
        <SectionView>
            <PCaption>{caption}</PCaption>
            {(() => {
                switch (true) {
                    case currentView.caption === viewCaption.HOME || currentView.caption === viewCaption.GAME_SEARCH:
                        return (<>
                            <SearchBar />
                            <NewGameButton />
                        </>);
                    case currentView.caption === viewCaption.GAME_DETAIL:
                        return (<>
                            <NewGameButton />
                            <HomeButton />
                        </>);
                    case currentView.caption === viewCaption.NEW_GAME:
                        return (<>
                            <HomeButton />
                        </>);
                    default:
                        return null;
                };
            })()}
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
    font-size: 11px;
`;

export default ToolBar;