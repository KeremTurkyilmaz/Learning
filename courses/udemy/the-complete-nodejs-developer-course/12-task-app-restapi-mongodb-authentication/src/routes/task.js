import Express from 'express';
import auth from '../middleware/auth';
import TaskModel from '../models/task';

const taskRouter = Express.Router();

taskRouter.post('/tasks', auth, async (req, res) => {
	// Get logged user id
	const { _id: loggedUserId } = req.user;

	// Create a new task with user id reference
	const task = new TaskModel({
		...req.body,
		owner: loggedUserId,
	});

	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		return res.status(400).send(err);
	}
});

// Get all user from the db
taskRouter.get('/tasks', auth, async (req, res) => {
	try {
		// Method 1
		const user = req.user;
		await user.populate('tasks').execPopulate();

		// Method 2
		// const ownerId = req.user._id;
		// const tasks = await TaskModel.find({ owner: ownerId });

		// Return tasks array
		return res.send(user.tasks);
	} catch (error) {
		return res.status(500).send(error);
	}
});

// Get a specific user from the db
taskRouter.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	const ownerId = req.user._id;
	try {
		const task = await TaskModel.findOne({ _id, owner: ownerId });
		if (!task) return res.status(404).send("Task not found, you aren't the owner");
		return res.send(task);
	} catch (error) {
		return res.status(500).send();
	}
});

// Update data for a specific task
taskRouter.patch('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	const _body = req.body;
	const ownerId = req.user._id;

	const updates = Object.keys(req.body);
	const allowedUpdateds = ['description', 'completed'];

	const isValidOperation = updates.every((update) => allowedUpdateds.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Updates!' });
	}

	try {
		const task = await TaskModel.findOne({ _id, owner: ownerId });

		// If we don't find the task, return 404 status
		if (!task) res.status(404).send({ error: 'Task Not Found' });

		// Update all the object key
		updates.forEach((update) => (task[update] = _body[update]));

		await task.save();

		// Otherwise return the new task
		res.send(task);
	} catch (error) {
		return res.status(400).send(error);
	}
});

// Delete a specific task
taskRouter.delete('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	const ownerId = req.user._id;
	try {
		const task = await TaskModel.findOneAndDelete({ _id, owner: ownerId });
		if (!task) res.status(404).send("Can't delete this task, you aren't authorized");
		res.send(task);
	} catch (error) {
		return res.status(400).send(error);
	}
});

export default taskRouter;
