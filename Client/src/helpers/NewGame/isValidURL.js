const isURL = (str) => {
    let error = "";

    const isUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const isImage = /\.(jpg|jpeg|png|svg)$/i;

    if (!isUrl.test(str)) error = "The Clipboard's Content Is Not an URL!\n\nCurrent Clipboard Content: \n" + str;
    if (!isImage.test(str)) error = "The URL Must Correspond to an Image!\nAllowed Formats: JPG, JPEG, PNG, SVG\n\nCurrent Clipboard Content: \n" + str;
    
    // Falta evaluar si la URL existe
    // Checar Rick&Morty > LoginForm > handleSubmit

    if (error) alert(error);

    return !error;
};

export default isURL;