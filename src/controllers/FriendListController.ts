
import express from 'express';
import * as mongoose from 'mongoose';
import { UserSchema } from './../mongooseModels/UserModel';
import { UserClass } from 'models/UserClass';
const User = mongoose.model('User', UserSchema);
export class FriendListController {
    // add a friend to user's friend list
    public addFriend(req: express.Request, res: express.Response) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $push: { "friendsList": { "friendId": req.body.friendId } } }, (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result == null)
                res.status(404).json({ message: "resource not found" });
            else
                res.status(201).json({ message: "friend added" });
        });
    }

    //get user's friends by his id, and sending him userNmae picture ranking and score
    public getFriends(req: express.Request, res: express.Response) {

        User.findOne({}).where('_id').equals(req.params.userId).select('friendsList').exec((err, friendList: UserClass) => {
            if (err) {
                res.json(err);
            }

            let tab: Array<any> = []
            if (friendList == null || friendList.friendsList.length == 0) {
                res.status(404).json({ message: "resource not found" })
            }
            else {
                for (let i = 0; i < friendList.friendsList.length; i++) {
                    tab.push(friendList.friendsList[i]['friendId']);
                }
                User.find({}).where('_id').in(tab).select('username picture ranking scores.score_global').exec((err, friends) => {
                    if (err) {
                        res.json(err);
                    }
                    if (friends.length == 0) {
                        res.status(404).json({ message: 'resource not found' });
                    }
                    else
                        res.status(200).json(friends);
                });
            }
        });
    }
    // deleting a user's friend by his id and his friend id "friendship have experation time huh"
    public deleteFriend(req: express.Request, res: express.Response) {

        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { "friendsList": { "friendId": req.body.friendId } } }).exec((err, user) => {
            if (err) {
                res.status(500).json(err);
            }

            if(user==null ){
                res.status(404).json({message:"resource not found"});
            }
            else
            res.status(202).json(user);
        })
    }

}