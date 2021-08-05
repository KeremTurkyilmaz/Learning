import jwt from 'jsonwebtoken';
import UserModel from '../models/user';

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');

		// Grab the user id
		const { _id } = jwt.verify(token, 'mysecretsentence');

		const user = await UserModel.findOne({ _id, 'tokens.token': token });

		if (!user) throw new Error();

		// Pass the user to the request
		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		res.status(401).send({ error: 'Please authenticate' });
	}
};

export default auth;
