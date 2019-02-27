
import express from 'express';
import * as mongoose from 'mongoose';
import { UserSchema } from './../mongooseModels/UserModel';
const User = mongoose.model('User', UserSchema);
export class FriendListController {
    // add a friend to user's friend list
    public addFriend(req: express.Request, res: express.Response) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $push: { "friendsList": { "friendId": req.body.friendId } } }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    //get user's friends by his id, and sending him userNmae picture ranking and score
    public getFriends(req: express.Request, res: express.Response) {

        User.find({}).where('_id').equals(req.params.userId).select('friendsList').exec((err, friendList) => {
            if (err) { 
                res.json(err);
            }
            let tab:Array<any>=[]
            /*for(let i =0;i<friendList[0]['friendsList'].length;i++){
                tab.push(friendList[0]['friendsList'][i]['friendId']);
            }*/
            User.find({}).where('_id').in(tab).select('userName picture ranking scores').exec((err,friends)=>{
                if(err){
                    res.json(err);
                }
                res.json(friends);
            });
        })
    }
    // deleting a user's friend by his id and his friend id "friendship have experation time huh"
    public deleteFriend(req: express.Request, res: express.Response) {

        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { "friendsList": { "friendId": req.body.friendId } } }).exec((err, user) => {
            if (err) {
                res.json(err);
            }

            res.json(user);
        })
    }

}