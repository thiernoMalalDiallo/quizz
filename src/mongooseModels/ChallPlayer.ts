import * as mongoose from 'mongoose';
import { setFlagsFromString } from 'v8';
const Schema = mongoose.Schema;
export const ChallPlayerSchema = new Schema({
    challengedId: {
        type: String,
        required: true
    },
    challengerId: {
        type: String,
        required: true
    },
    quizId: {
        type: String,
        required: true
    },
    scoreChallenger: {
        type: Number,
        required: true
    }
    ,
    
    scoreChallenged: {
        type: Number
    },
    
    resultChallenged: {
        type: String
    }
    ,
    resultChallenger: {
        type: String
    }

});