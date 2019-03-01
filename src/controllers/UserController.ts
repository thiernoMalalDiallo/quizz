import * as mongoose from 'mongoose';
import { UserSchema } from '../mongooseModels/UserModel';
import express from 'express';

const User = mongoose.model('User', UserSchema);

export class UserController {

    public addNewUser(req: express.Request, res: express.Response) {
        User.find({ UserName: req.body.UserName }, (err, user) => {
            if (err) {
                console.log(err);
            }
            console.log(
                user.length);
            if (user.length == 0) {
                let newUser = new User(req.body);
                newUser.save((err, userAdd) => {
                    if (err) {
                        res.send(err);
                    }
                    console.log(userAdd);
                    res.status(201).json(userAdd);
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
    public Authentification(req: express.Request, res: express.Response) {
        User.findOne({ userName: req.query.username, password: req.query.password }, (err, user) => {
            
            if (err) {
                res.send(err);
            }
            else{
                if( user==null){
                    res.status(401).json("authentication failed")
                }
                else{
                res.status(200).json(user);
            }
            }
        });
    }

    public updateUser(req: express.Request, res: express.Response) {
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

