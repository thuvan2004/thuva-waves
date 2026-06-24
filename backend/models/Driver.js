import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true
    },
    licenseImage: String,
    isApproved: {
        type: Boolean,
        default: false  // Admin approve பண்ணணும்
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    currentLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],  // [longitude, latitude]
            default: [0, 0]
        }
    },
    rating: {
        type: Number,
        default: 0
    },
    totalRides: {
        type: Number,
        default: 0
    },
    totalEarnings: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Geospatial index — nearby drivers find பண்ண
driverSchema.index({ currentLocation: '2dsphere' });

export default mongoose.model('Driver', driverSchema);