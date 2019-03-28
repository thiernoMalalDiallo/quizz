import * as mongoose from 'mongoose';
import { UserSchema } from '../mongooseModels/UserModel';
import express from 'express';
import { Util } from './Utils';

const User = mongoose.model('User', UserSchema);

export class UserController {

    public addNewUser(req: express.Request, res: express.Response) {
        User.find({ username: req.body.username }, (err, user) => {
            if (err) {
                console.log(err);
            }
            console.log( "user length: " +
                user.length);
            if (user.length == 0) {
                // Hash password
                req.body.password = Util.hashPassword(req.body.password);
                // any user using current username not found then create new user
                let newUser = new User(req.body);
                newUser.save((err, userAdd) => {
                    if (err) {
                        res.send(err);
                    }
                    console.log(userAdd);
                    res.status(201).json(newUser);
                });
            }
            else {
                res.status(409).json(user);
            }
        });
    }
    public getUsers(req: express.Request, res: express.Response) {
        User.find({}, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    }
    public getUserWithID(req: express.Request, res: express.Response) {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    public authentication(req: express.Request, res: express.Response) {
        // Hash password
        req.body.password = Util.hashPassword(req.body.password);
        User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
            if (err) {
                res.send(err);
            }
            else{
                if( user==null){
                    res.status(401).json({message:"authentication failed"})
                }
                else{
                res.status(200).json(user);
            }
            }
        });
    }

    public updateUser(req: express.Request, res: express.Response) {
        if(req.body.password){
            req.body.password = Util.hashPassword(req.body.password);
        }
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    public deleteUser(req: express.Request, res: express.Response) {
        User.remove({ _id: req.params.userId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!' });
        });
    }

    public deleteAllUser(req: express.Request, res: express.Response) {
        User.remove({ }, (err) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json({ message: 'Successfully deleted all users !' });
        });
    }
    public getRanking(req:express.Request,res:express.Response){
        User.find({}).where('_id').equals(req.params.userId).select('picture UserName').exec((err,user)=>{
            if(err){
                res.send(err);
            }
            console.log(user)
            res.json(user);
        });
    }
}

