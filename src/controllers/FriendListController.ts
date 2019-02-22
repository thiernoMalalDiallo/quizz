
import express from 'express';
import * as mongoose from 'mongoose';
import { UserSchema } from './../models/UserModel';
import { UserController} from './UserController';
const User = mongoose.model('User', UserSchema);
export class FriendListController{
    public userContorl:UserController=new UserController();
    // add a friend to user's friend list
    public addFriend(req:express.Request,res:express.Response){
        User.findOneAndUpdate({ _id: req.params.userId}, {$push: {"friendsList":{"friendId":req.body.friendId}}},(err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
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