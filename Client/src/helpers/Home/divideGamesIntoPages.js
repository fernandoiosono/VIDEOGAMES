const divideGamesIntoPages = (arrGames, gamesPerPage) => {
    const pages = [];
    const totalPages = Math.ceil(arrGames.length / gamesPerPage);
    
    for (let x = 0; x < totalPages; x++) {
        const startIndex = x * gamesPerPage;
        const pageData = arrGames.slice(startIndex, startIndex + gamesPerPage);

        pages.push(pageData);
    }

    return pages;
};

export default divideGamesIntoPages;