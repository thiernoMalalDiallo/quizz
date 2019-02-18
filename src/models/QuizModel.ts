
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const QuizSchema = new Schema({
    id_question: {
        type: String
    },
    id_answer: {
        type: String
    },
    level: {
        type: String            
    },
    theme: {
        type: String          
    }
}); 