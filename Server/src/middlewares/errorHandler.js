const errorHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch(error) {
            const message = (error.response)
                ? "(RAWG): " + error.response.data.error
                : "(LOCAL): " + error.message;

            res.status(500).json({ error: message });
        }
    }
};

module.exports = errorHandler;