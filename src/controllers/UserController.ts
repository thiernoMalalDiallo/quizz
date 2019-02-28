import * as mongoose from 'mongoose';
import { UserSchema } from '../mongooseModels/UserModel';
import express from 'express';

const User = mongoose.model('User', UserSchema);

export class UserController {

    public addNewUser(req: express.Request, res: express.Response) {
        User.find({ userName: req.body.userName }, (err, user) => {
            if (err) {
                console.log(err);
            }
            console.log( "user length: " +
                user.length);
            // faut faire une requete pour vérifier si l'username existe ou non
            // user.length est forcement > 0 à partir du moment ou on a quelque chose dans le corps de la requette HTTP
            // c'est ici qu'il faut appeler la fonction prenant en parametre l'username et vérifier si il existe ou pas
            // elle renvoie un boolean, ça donne un truc du genre: if (!usernameExist(Username)){ ... } 
            // else {res.status(409).json(user);
            if (user.length == 0) {
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
    public Authentification(req: express.Request, res: express.Response) {
        User.findOne({ UserName: req.body.Username, Password: req.body.Password }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
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

