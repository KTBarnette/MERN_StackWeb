import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        default: 'Unknown'
    },
    ISBN: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'checked out', 'reserved'], // Extended functionality
        default: 'available'
    },
    checkedOutBy: {
        type: String, // Changed from ObjectId to String for mock user names
        default: null
    },
    dueDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.models.Book || mongoose.model('Book', bookSchema);
