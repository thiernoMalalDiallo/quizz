import * as mongoose from 'mongoose';
const Schema =mongoose.Schema;
export const ChallengeSchema = new Schema({
    quizId:{
        type:String,
        required:true
    },
    challengeType:{
        type:String,
        required:true
    },

});
