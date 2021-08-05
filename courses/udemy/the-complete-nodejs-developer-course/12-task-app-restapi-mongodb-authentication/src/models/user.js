import Mongoose from 'mongoose';
import Validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import TaskModel from './task';

import { generateHashPassword } from '../utils';

const userSchema = new Mongoose.Schema({
	name: { type: String, required: true, trim: true },
	password: {
		type: String,
		required: true,
		minLength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contains "password"');
			}
		},
	},
	email: {
		type: String,
		unique: true, // Allow only unique emails
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!Validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number');
			}
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner',
});

// Delete user tokens and password before return it
userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	// Delete password and tokens information
	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'mysecretsentence');
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error('Unable to Login! User not Found');
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new Error('Unable to Login ! Wrong Password');
	return user;
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) user.password = await generateHashPassword(user.password);
	next();
});

// Delete user tasks when user is deleted
userSchema.pre('remove', async function (next) {
	const user = this;
	await TaskModel.deleteMany({ owner: user._id });
	next();
});

const User = Mongoose.model('User', userSchema);

export default User;
