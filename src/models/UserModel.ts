
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
    position: {
        type: Number,
        default:0           
    }
})