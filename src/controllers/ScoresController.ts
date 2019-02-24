import * as express from 'express';
import * as mongoose from 'mongoose';
import {UserSchema} from './../mongooseModels/UserModel'
const User=mongoose.model('User',UserSchema);
export class ScoresController{
    public getGlobal_Score(res:express.Response,req:express.Request):any{
        User.find({}).where("_id").equals(req.params.userId).select('score.score_global').exec((err,globalScore)=>{
            if(err){
                res.status(500).json(err);
            }
            res.status(200).json(globalScore)
        })
    }
}