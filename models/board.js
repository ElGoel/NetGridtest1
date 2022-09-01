import Joi from 'joi';
import mongoose from 'mongoose';

function validateBoard(board) {
    const schema = Joi.object({
        stage: Joi.number().min(1),
        title: Joi.string().min(3).required()
    });

    return schema.validate(board);
}

const boardSchema = new mongoose.Schema({
    stage: {
        type: Number,
        default: 1,
        minLength: 1,
        maxLength: 50,
    },
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
    }
});

const BoardModel = mongoose.model('Board', boardSchema);

export { BoardModel, validateBoard };