import * as mongoose from 'mongoose';
import { AchievementSchema } from '../mongooseModels/AchievementModel';
import express from 'express';
const path = require("path");

const Achievement = mongoose.model('Achievement',AchievementSchema);

export class AchievementController {

    // create a new achievement
    public addNewAchievement(req: express.Request, res: express.Response) {
        if(req.query.score == 10){
            var nbr_achievements : any; 
            Achievement.findOne({}).where('user_id').equals(req.query.userId).where('theme').equals(req.query.theme).select('number_achievements').exec((err,achievement)=>{
                if(err){
                    res.json(err);
                }
                    console.log(achievement);
                    res.json('coucou');
                }); 
            /*Achievement.findOneAndUpdate({ user_id: req.query.userId, theme: req.query.theme }, { $push: { "number_achievements": 1} }, (err, achievement) => {
                if (err) {
                    res.send(err);
                }
                res.status(200).json(achievement);
            });*/
            res.json('dans le if');
        }
        res.json('Not achievement');
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
        Achievement.find({}).where('user_id').equals(req.params.userId).select('theme number_achievements').exec((err,achievements)=>{
            if(err){
                res.json(err);
            }
                res.status(200).json(achievements);
            }); 

    }
}

