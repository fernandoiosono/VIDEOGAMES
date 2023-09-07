const validateNewGameData = (gameData, property, setErrors, errors) => {
    let error = "";
    const propName = property.toUpperCase();

    if (!gameData[property]) {
        error = `Plase Enter The ${propName}!`;
    } else {
        switch (true) {
            case property === "genres" || property === "platforms":
                if (!gameData[property].length) error = `Plase Enter The ${propName}!`;
                break;

            case property === "name" || property === "description" || property === "image":
                if (gameData[property].length > 255) error = `The ${propName} Field Must Not Have More Than 255 Characters!`;
        }
    }

    setErrors({ ...errors, [property]: error });
};

export default validateNewGameData;