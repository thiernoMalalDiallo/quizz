
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
            let length = user[0]['friendsList'].length;
            console.log('taille : '+length);
            user[0]['friendsList'][length]='salut';
            res.json(user);
        })
    }

    //get friends 
    public getFriends(req:express.Request,res:express.Response){

        User.find({}).where('_id').equals(req.params.userId).select('friendsList').exec((err,user)=>{
            if(err){
                res.json(err);
            }
            res.json(user);
        })
    }

    public deleteFriend(req:express.Request,res:express.Response){

        User.find({}).where('_id').equals(req.params.userId).select('friendsList').exec((err,user)=>{
            if(err){
                res.json(err);
            }

            res.json(user);
        })
    }

}