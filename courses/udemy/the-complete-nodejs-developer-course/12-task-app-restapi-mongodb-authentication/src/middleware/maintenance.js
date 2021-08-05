// Middleware - Site is in maintenance mode
const maintenance = async (req, res, next) => {
	res.status(503).send({ error: 'Site is currently down. Check back soon!' });
};

export default maintenance;
