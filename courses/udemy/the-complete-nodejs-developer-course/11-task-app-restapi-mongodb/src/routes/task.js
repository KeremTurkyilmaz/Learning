import Express from 'express';
import TaskModel from '../models/task';

const taskRouter = Express.Router();

taskRouter.post('/tasks', async (req, res) => {
	const task = new TaskModel(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		return res.status(400).send(err);
	}
});

// Get all user from the db
taskRouter.get('/tasks', async (req, res) => {
	try {
		const tasks = await TaskModel.find({});
		return res.send(tasks);
	} catch (error) {
		return res.status(500).send(error);
	}
});

// Get a specific user from the db
taskRouter.get('/tasks/:id', (req, res) => {
	const _id = req.params.id;
	try {
		const task = TaskModel.findById(_id);
		if (!task) return res.status(404).send();
		return res.send(task);
	} catch (error) {
		return res.status(500).send();
	}
});

// Update data for a specific task
taskRouter.patch('/tasks/:id', async (req, res) => {
	const _id = req.params.id;
	const _body = req.body;

	try {
		const task = await TaskModel.findByIdAndUpdate(
			// Target task by Id
			_id,
			// New User data using object destructuring
			{ ..._body },
			{
				// Return the updated task
				new: true,
				// Run all Model validators
				runValidators: true,
			}
		);
		// If we don't find the task, return 404 status
		if (!task) res.status(404).send();

		// Otherwise return the new task
		res.send(task);
	} catch (error) {
		return res.status(400).send(error);
	}
});

// Delete a specific task
taskRouter.delete('/tasks/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await TaskModel.findByIdAndDelete(_id);
		if (!task) res.status(404).send();
		res.send(task);
	} catch (error) {
		return res.status(400).send(error);
	}
});

export default taskRouter;
