import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
// class Quiz avec mongoose
export const QuizSchema = new Schema({
    QuizName:{
        type:String
    },
    Questions: [
        {
            Question: {
                type:String
            },
            Possible_Answers: [
                {
                    Possible_Answer: {
                        type:String
                    }
                }
            ],
            True_Answer: [
                {
                Answer:{
                    type:String
                }
            }
            ]
        }
    ],
    Level: {
        type:String
    },
    Theme:  {
        type:String
    },
    creationDate:{
        type: Date,
        default: Date.now
    },
    played:{
        type:Number,
        default:0
    }          
}); 