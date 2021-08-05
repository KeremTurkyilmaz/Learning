import Mongoose from 'mongoose';

const taskSchema = new Mongoose.Schema({
	description: { type: String, required: true, trim: true },
	completed: { type: Boolean, default: false },
	owner: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

const Task = Mongoose.model('Task', taskSchema);

export default Task;
