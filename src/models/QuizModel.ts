import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
// class Quizz avec mongoose
export const QuizSchema = new Schema({
    QuizzName:String,
    Questions: [
        {
            Question: String,
            Possible_Answers: [
                {
                    Possible_Answer: String
                }
            ],
            True_Answer: [
                {
                Answer:String
            }
            ]
        }
    ],
    Level: String,
    Theme:  String          
}); 