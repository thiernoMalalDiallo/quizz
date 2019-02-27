import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
// class Quiz avec mongoose
export const QuizSchema = new Schema({
    quizName: {
        type: String
    },
    image: {
        type: String
    },
    questionsResponses: [
        {
            question:String,
            response1:String,
            response2:String,
            response3:String,
            response4:String
        }
    ],
    answers:[]
    ,
    level: {
        type: String
    },
    theme: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    played: {
        type: Number,
        default: 0
    }
}); 