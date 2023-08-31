import { useSelector } from "react-redux";
import { SearchBar, NewGameButton, GoBackButton } from ".";

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
            fatherView === "home" || fatherView === "detail" || fatherView === "newGame" ? (
                <GoBackButton />
            ) : null
        }
    </>);
};

export default ToolBar;