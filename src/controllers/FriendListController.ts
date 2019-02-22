
import express from 'express';
import * as mongoose from 'mongoose';
import { UserSchema } from './../models/UserModel';

const User = mongoose.model('User', UserSchema);
export class FriendListController{
    // add a friend to user's friend list
    public addFriend(req:express.Request,res:express.Response){

        User.find({}).where('_id').equals(req.params.userId).select('friendsList').exec((err,user)=>{
            if(err){
                res.json(err);
            }
            res.json(user);
        })
    }
}