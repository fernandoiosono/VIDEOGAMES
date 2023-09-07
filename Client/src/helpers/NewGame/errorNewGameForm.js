const errorNewGameForm = (gameData, errors) => {
    let error = "";

    const countErrors = (Object.values(errors).filter(elmnt => elmnt !== "").length);

    const countEmptyFields = (Object.values(gameData).filter((elmnt) => {
        switch (typeof elmnt) {
            case "string":
                return elmnt === "";
            case "number":
                return elmnt === 0;
            case "object": // Array
                return elmnt.length === 0;
        }        
    }).length);

    if (countEmptyFields) {
        error = "Please Fill All Fields!";
    } else if (countErrors) {
        error = "Correct The Form Data To Continue!";
    }

    return error;
};

export default errorNewGameForm;