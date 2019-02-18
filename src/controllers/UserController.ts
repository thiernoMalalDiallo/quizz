import * as mongoose from 'mongoose';
import {UserSchema} from '../models/UserModel';
import express from 'express';

const User = mongoose.model('User', UserSchema); 

export class UserController{

    public addNewUser (req: express.Request, res: express.Response) {              
            let newUser = new User(req.body);
        
            newUser.save((err, user) => {
                if(err){
                    res.send(err);
                }    
                res.json(user);
            });
        }
        public getUsers (req: express.Request, res: express.Response) {           
            User.find({}, (err, users) => {
                if(err){
                    res.send(err);
                }
                res.json(users);
            });
        }
        public getUserWithID (req: express.Request, res: express.Response) {  
            User.findById(req.params.userId, (err, user) => {
                if(err){
                    res.send(err);
                }
                res.json(user);
            });
        }
        public Authentification (req: express.Request, res: express.Response) {  
             User.find({UserName:req.body.Username,Password:req.body.Password}, (err, user) => {
                 if(err){
                  res.send(err);
               }
                res.json(user);
             });
        }
        
        public updateUser(req: express.Request, res: express.Response) {           
            User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, contact) => {
                if(err){
                    res.send(err);
                }
                res.json(contact);
            });
        }
        public deleteUser (req: express.Request, res: express.Response) {           
            User.remove({ _id: req.params.contactId }, (err) => {
                if(err){
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted contact!'});
            });
        }
    }
    
