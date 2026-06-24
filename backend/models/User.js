import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['passenger', 'driver', 'admin'],
        default: 'passenger'
    },
    profileImage: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    fcmToken: String  // Firebase notification token
}, { timestamps: true });

// Password hash பண்றது — save பண்றதுக்கு முன்னாடி
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Password verify பண்றது
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);