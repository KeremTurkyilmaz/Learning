import Moongose from 'mongoose';

const Task = Moongose.model('Task', {
	description: { type: String, required: true, trim: true },
	completed: { type: Boolean, default: false },
});

export default Task;
