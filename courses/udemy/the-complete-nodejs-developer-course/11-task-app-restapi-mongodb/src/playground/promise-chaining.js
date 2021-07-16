// Promises Chaining -> https://javascript.info/promise-chaining
// Return after resolve / reject -> https://stackoverflow.com/questions/32536049/do-i-need-to-return-after-early-resolve-reject

// Import Moongoose connection
import MongooseDB from '../db/mongoose';

// Import models
import TaskModel from '../models/task';

const mongooseConnection = new MongooseDB();
mongooseConnection.init();

const _id = '60eeecd3a919d75a2415c41e';

// Promise Chaining
// Update a recond inside the database and log all completed tasks
TaskModel.findByIdAndUpdate(_id, { completed: false })
	.then((task) => {
		console.log('Task Updated', task);
		return TaskModel.find({ completed: true });
	})
	.then((tasksCompleted) => {
		console.log('Tasks Completed', tasksCompleted);
	})
	.catch((e) => {
		console.error(e);
	});

// Promise Chaining
// Delete a recond inside the database and log all incompleted tasks
TaskModel.findByIdAndDelete(_id)
	.then((task) => {
		console.log('Remove Task', task);
		return TaskModel.find({ completed: false });
	})
	.then((incompletedTasks) => {
		console.log(`${incompletedTasks.length} Incompleted Tasks`, incompletedTasks);
	})
	.catch((err) => {
		console.error(err);
	});
