import express from 'express';
import {FriendListController} from './../controllers/FriendListController';
export class RoutesFriendList{
    public friendListContorller = new FriendListController();
    public routes(app:express.Application){
        app.route('/friendList/:userId').
        post(this.friendListContorller.addFriend).
        get(this.friendListContorller.getFriends)
        .delete(this.friendListContorller.deleteFriend);
    }
}