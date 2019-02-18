
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const AnswerSchema = new Schema({

    answers: [
        {
            possible_answers: [
                {
                    answer: String
                }
            ],
            true_answer: String 
        }
    ]
});