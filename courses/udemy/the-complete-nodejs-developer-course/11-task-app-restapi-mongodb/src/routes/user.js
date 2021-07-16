import Express from 'express';
import UserModel from '../models/user';

const userRouter = Express.Router();

userRouter.post('/users', async (req, res) => {
	const user = new UserModel(req.body);
	try {
		await user.save();
		return res.status(201).send(user);
	} catch (error) {
		return res.status(400).send(error);
	}
});

// Get all user from the db
userRouter.get('/users', async (req, res) => {
	try {
		const users = await UserModel.find({});
		return res.status(201).send(users);
	} catch (error) {
		return res.status(500).send(error);
	}
});

// Get a specific user from the db
userRouter.get('/users/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await UserModel.findById(_id);
		if (!user) return res.status(404).send();
		return res.send(user);
	} catch (error) {
		return res.status(500).send(error);
	}
});

// Update data for a specific user
userRouter.patch('/users/:id', async (req, res) => {
	const _id = req.params.id;
	const _body = req.body;

	try {
		const user = await UserModel.findByIdAndUpdate(
			// Target User by Id
			_id,
			// New User data using object destructuring
			{ ..._body },
			{
				// Return the updated user
				new: true,
				// Run all Model validators
				runValidators: true,
			}
		);
		// If we don't find the user, return 404 status
		if (!user) res.status(404).send();

		// Otherwise return the new user
		res.send(user);
	} catch (error) {
		return res.status(400).send(error);
	}
});

// Delete a specific user
userRouter.delete('/users/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await UserModel.findByIdAndDelete(_id);
		if (!user) res.status(404).send();
		res.send(user);
	} catch (error) {
		return res.status(400).send(error);
	}
});

export default userRouter;
