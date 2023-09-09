const validateNewGameData = (gameData, property, setErrors, errors) => {
    let error = "";
    const propUpperName = property.toUpperCase();
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]/;

    if (!gameData[property]) {
        error = `Plase Enter The ${propUpperName}!`;
    } else {
        switch (true) {
            case property === "genres" || property === "platforms":
                if (!gameData[property].length) error = `Plase Enter The ${propUpperName}!`;
                break;

            case property === "name" || property === "description":
                switch (true) {
                    case gameData[property].length > 255:
                        error = `The ${propUpperName} Field Must Not Have More Than 255 Characters!`;
                        break;

                    case hasSpecialChars.test(gameData[property]):
                        error = `The ${propUpperName} Field Must Not Contain Special Characters`;
                }
                break;

            case property === "image":
                if (gameData[property].length > 255) error = `The ${propUpperName} Field Must Not Have More Than 255 Characters!`;
        }
    }

    setErrors({ ...errors, [property]: error });
};

export default validateNewGameData;