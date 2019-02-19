"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const UserModel_1 = require("../models/UserModel");
const User = mongoose.model('User', UserModel_1.UserSchema);
class UserController {
    addNewUser(req, res) {
        User.find({ UserName: req.body.UserName }, (err, user) => {
            if (err) {
                console.log(err);
            }
            console.log(user.length);
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
    getUsers(req, res) {
        User.find({}, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    }
    getUserWithID(req, res) {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    Authentification(req, res) {
        User.findOne({ UserName: req.body.Username, Password: req.body.Password }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    deleteUser(req, res) {
        User.remove({ _id: req.params.userId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!' });
        });
    }
    getRanking(req, res) {
        User.find({}).where('_id').equals(req.params.userId).select('picture UserName').exec((err, user) => {
            if (err) {
                res.send(err);
            }
            console.log(user);
            res.json(user);
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map