
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username: {
        type: String,
        required: 'Enter a first name'
    },
    password: {
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
        score_global: {type:Number,default:0},
        score_theme: [{ 
            theme: String,
            score: Number,
            numberOfTrophy:{
                type:Number,
                default:0
            }
        }],
        score_quiz: [{
            quizId: String,
            score: Number,
            last_played:Date
        }]
    },
    friendsList: [{
        friendId: String,
        accepted:{
            type:Boolean,
            default:false
        }
    }]
})