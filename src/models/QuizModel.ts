import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
// class Quiz avec mongoose
export const QuizSchema = new Schema({
    QuizName:{
        type:String,
        required:"give the quiz a name"
    },
    Questions: [
        {
            Question: {
                type:String,
                required:"one or multiple questions are lacking  "
            },
            Possible_Answers: [
                {
                    Possible_Answer: {
                        type:String,
                        required:"one or multiple possibale_answers are lacking  "
                    }
                }
            ],
            True_Answer: [
                {
                Answer:{
                    type:String,
                    required:"one or multiple answers are lacking  "
                }
            }
            ]
        }
    ],
    Level: {
        type:String,
        required:"give the quiz a level"
    },
    Theme:  {
        type:String,
        required:"give the quiz a theme"
    }          
}); 