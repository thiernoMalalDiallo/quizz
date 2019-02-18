
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

/*export const QuestionSchema = new Schema({
    questions: [
        {
            question: String,
            possible_answers: [
                {
                    answer: String
                }
            ],
            true_answer: String 
        }
    ]
});*/

export const QuestionSchema = new Schema({
    questions: [
        {
            question: String
        }
    ]
});

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
