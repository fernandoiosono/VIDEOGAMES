import { useSelector } from "react-redux";
import { SearchBar, NewGameButton, HomeButton } from "..";

const ToolBar = () => {
    const fatherView = useSelector((state) => state.navFather);

    return (<>
        {
            fatherView === "home" ? (
                <SearchBar />
            ) : null
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
    </>);
};

export default ToolBar;