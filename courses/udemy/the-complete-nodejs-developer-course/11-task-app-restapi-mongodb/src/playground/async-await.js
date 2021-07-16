// Async - Await -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

// Import Moongoose connection
import MongooseDB from '../db/mongoose';

// Import models
import TaskModel from '../models/task';
import UserModel from '../models/user';

const mongooseConnection = new MongooseDB();
mongooseConnection.init();

// Update user age and return all the users with the same age
const updateAgeAndCount = async (id, age) => {
	if (!id) throw new Error('You must provide an id');
	const user = await UserModel.findByIdAndUpdate(id, { age });
	const count = await UserModel.countDocuments({ age });
	return count;
};

// Delete a Task and return all the incompleted tasks
const deleteTaskAndCount = async (id) => {
	if (!id) throw new Error('You must provide an id');
	const task = await TaskModel.findByIdAndDelete(id);
	const count = await TaskModel.countDocuments({ completed: false });
	return count;
};

updateAgeAndCount('60eeef27d3442a5af510a24e', 23)
	.then((count) => console.log('Count:', count))
	.catch((e) => console.error(e));

deleteTaskAndCount('60eeebb3447b9659b688db61')
	.then((count) => console.log(`${count} Incompleted Tasks remaining`))
	.catch((e) => console.error(e));
