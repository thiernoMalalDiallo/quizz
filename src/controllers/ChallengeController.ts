
import express from 'express';
import * as mongoose from 'mongoose';
import { UserSchema } from './../mongooseModels/UserModel';
const User = mongoose.model('User', UserSchema);
export class ChallengeController {
    public challengeAfriend (req:express.Request,res:express.Response){
        console.log(req.body);
        User.findOneAndUpdate({ _id: req.params.userId }, {$push:{ "scores.score_challlenge":
            req.body
        }} ,
         (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });

    }
  
}