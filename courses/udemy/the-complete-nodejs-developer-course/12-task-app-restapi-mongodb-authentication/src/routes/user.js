import Express from 'express';
import UserModel from '../models/user';
import auth from '../middleware/auth';

const userRouter = Express.Router();

userRouter.post('/users', async (req, res) => {
	const user = new UserModel(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		return res.status(201).send({ user, token });
	} catch (error) {
		return res.status(400).send(error);
	}
});

userRouter.post('/users/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findByCredentials(email, password);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		return res.status(400).send(error.message);
	}
});

// Logout current user
userRouter.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);
		await req.user.save();
		res.send('User logged out');
	} catch (error) {
		return res.status(500).send(error);
	}
});

// Logout current user from all devices
userRouter.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.status(200).send({ message: 'All User logged out' });
	} catch (error) {
		return res.status(500).send(error);
	}
});

// Get the current logged user
userRouter.get('/users/me', auth, async (req, res) => {
	try {
		const { user } = req;
		if (!user) throw new Error("Request doesn't provide a user");
		return res.status(201).send(user);
	} catch (error) {
		return res.status(500).send(error.message);
	}
});

// Update data for a specific user
userRouter.patch('/users/me', auth, async (req, res) => {
	const user = req.user;
	const _body = req.body;

	const updates = Object.keys(req.body);
	const allowedUpdateds = ['name', 'email', 'password', 'age'];
	const isValidOperation = updates.every((update) => allowedUpdateds.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Updates!' });
	}

	try {
		if (!user) throw new Error("Can't update user, user not found");
		// Update all the object key
		updates.forEach((update) => (user[update] = _body[update]));

		// Save new user information
		await user.save();

		// Return updated user
		res.send(user);
	} catch (error) {
		return res.status(404).send(error.message);
	}
});

// Delete a specific user
userRouter.delete('/users/me', auth, async (req, res) => {
	const user = req.user;
	try {
		await user.remove();
		if (!user) throw new Error('User not found');
		res.send(user);
	} catch (error) {
		return res.status(400).send(error);
	}
});

export default userRouter;
