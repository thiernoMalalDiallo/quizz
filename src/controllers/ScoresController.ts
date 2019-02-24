import * as express from 'express';
import * as mongoose from 'mongoose';
import {UserSchema} from './../mongooseModels/UserModel'
const User=mongoose.model('User',UserSchema);
export class ScoresController{
    // get all the scores of user by id
    public getScores(req:express.Request,res:express.Response):any{
        User.find({}).where('_id').equals(req.params.userId).select('scores').exec((err,score)=>{
            if(err){
                res.status(500).json(err);
            }
            res.status(200).json(score);
        })
    }
    // update Global_score by user's id
    public updateGlobal_Score(req:express.Request,res:express.Response):any{
        User.findByIdAndUpdate(req.params.userId,{$set:{'scores.score_global':req.body.score_global}}).exec((err,globalScore)=>{
            if(err){
                res.status(500).json(err);
            }
            res.status(200).json();
        })
    }
    // get global_score by user's id
    public getGlobal_Score(req:express.Request,res:express.Response):any{
        User.find({}).where("_id").equals(req.params.userId).select('scores.score_global').exec((err,globalScore)=>{
            if(err){
                res.status(500).json(err);
            }
            res.status(200).json(globalScore);
        })
    }
    // update Global_score by user's id
    public updateScore_quiz(req:express.Request,res:express.Response):any{
        User.findByIdAndUpdate(req.params.userId,{$set:{'scores.score_quiz':req.body.score_quiz}}).exec((err,score_quiz)=>{
            if(err){
                res.status(500).json(err);
            }
            res.status(200).json();
        })
    }
    // get global_score by user's id
    public getScore_quiz(req:express.Request,res:express.Response):any{
        User.find({}).where("_id").equals(req.params.userId).select('scores.score_quiz').exec((err,score_quiz)=>{
            if(err){
                res.status(500).json(err);
            }
            res.status(200).json(score_quiz);
        })
    }
}