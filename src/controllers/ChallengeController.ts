
import express from 'express';
import * as mongoose from 'mongoose';
import { UserSchema } from './../mongooseModels/UserModel';
import{ChallengeSchema} from "./../mongooseModels/ChallengeModel";
import {ChallPlayerSchema} from "./../mongooseModels/ChallPlayer"
const User = mongoose.model('User', UserSchema);
const Challenge = mongoose.model('Challenge',ChallengeSchema);
const ChallPlayer=mongoose.model("ChallPlayer",ChallPlayerSchema);
export class ChallengeController {
    public challengeAfriend (req:express.Request,res:express.Response){
        User.findOne().where('_id').equals(req.params.userId).
        exec((err, user) => {
            if (err) {
                res.status(500).json({message:err});
            }
            else
            {
                if(user==null){
                    res.status(404).json({message:"not found"});
                }
                else{
                    console.log();
                    res.json(user['scores']);
                }
            }
        });
    }
    public addDailyQuiz(req:express.Request,res:express.Response){
        let challenge= new Challenge(req.body);
        challenge.save((err,result)=>{
            if(err){
                res.status(500).json({message:err});
            }
            else
                res.status(201).json({message:"daily quiz added"});
        });
    }
  
}