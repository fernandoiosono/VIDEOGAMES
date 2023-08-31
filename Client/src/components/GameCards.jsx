import { useSelector } from "react-redux";

const GameCards = () => {
    const gamesByName = useSelector((state) => state.gamesByName)

    console.log(gamesByName);

    return (<></>);
};

export default GameCards;