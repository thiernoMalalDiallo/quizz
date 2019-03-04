import * as mongoose from 'mongoose';
import { setFlagsFromString } from 'v8';
const Schema= mongoose.Schema;
export const ChallPlayerSchema = new Schema({
    idChallenger:{
        type:String,
        required:true},
    idChallenged:{
        type:String,
        required:true},
    score:{
        type:Number,
        required:true}
});