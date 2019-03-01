import * as mongoose from 'mongoose';
import { AchievementSchema } from '../mongooseModels/AchievementModel';
import express from 'express';
import { Util } from './Utils';
const path = require("path");

const Achievement = mongoose.model('Achievement',AchievementSchema);

export class AchievementController {

    // create a new achievement
    public addNewAchievement(req: express.Request, res: express.Response) {
        if(req.query.score == 10){
            var nbr_achievements : any; 
            Achievement.findOne({}).where('user_id').equals(req.query.userId).where('theme').equals(req.query.theme).select('number_achievements').exec((err,achievement)=>{
                if(err){
                    return err;
                }
    
                    //nbr_achievements = achievement['number_achievements'];
                }); 
            Achievement.findOneAndUpdate({ user_id: req.query.userId, theme: req.query.theme }, { $push: { "number_achievements": 1} }, (err, achievement) => {
                if (err) {
                    res.send(err);
                }
                res.status(200).json(achievement);
            });
        }
        // newAchievement.user_id = req.query.userId;
        // newAchievement.theme = req.query.userId;
        // newAchievement.number_achievements = req.query.numberAchievements;
        // newAchievement.save((err, quiz) => {
        //     if (err) {
        //         res.status(400).json(res);
        //     }
        //     res.status(200).json(quiz);
        // });
        
    }
    // get all achievements
    public getAchievements(req: express.Request, res: express.Response) {
        console.log(require('path').dirname('./../mongooseModels/QuizModel'))
        Achievement.find({}, (err, achievements) => {
            if (err) {
                res.status(404).json(err);
            }
            res.status(200).json(achievements);
        })

    }
}

