
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    UserName: {
        type: String,
        required: 'Enter a first name'
    },
    Password: {
        type: String,
        required: 'Enter a last name'
    },
    picture: {
        type: String,
        required: 'Enter a picture'            
    },
    ranking: {
        type: Number,
        default:0          
    },
    scores : {
        score_global: Number,
        score_theme: [{
            theme: String,
            score: Number
        }],
        score_quiz: [{
            id_quizz: String,
            score: Number
        }],
        score_challlenge: [{
            id_challenger: String,
            result: String
        }]
    },
    friendsList: [{
        id_friend: String
    }]
})