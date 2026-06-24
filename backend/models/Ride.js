import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    pickup: {
        address: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    dropoff: {
        address: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    status: {
        type: String,
        enum: [
            'requested',   // Passenger request பண்ணான்
            'accepted',    // Driver accept பண்ணான்
            'arriving',    // Driver வருறான்
            'started',     // Ride start ஆச்சு
            'completed',   // Ride முடிஞ்சது
            'cancelled'    // Cancel ஆச்சு
        ],
        default: 'requested'
    },
    fare: {
        estimated: Number,
        actual: Number
    },
    distance: Number,  // km-ல
    duration: Number,  // minutes-ல
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    otp: String  // Ride start பண்ண OTP
}, { timestamps: true });

export default mongoose.model('Ride', rideSchema);