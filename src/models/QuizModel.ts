import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
// class Quizz avec mongoose
export const QuizSchema = new Schema({
    QuizzName:{
        type:String,
        required:"give the quizz a name"
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
        required:"give the quizz a level"
    },
    Theme:  {
        type:String,
        required:"give the quizz a theme"
    }          
}); 