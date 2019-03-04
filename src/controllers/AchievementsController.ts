import * as mongoose from 'mongoose';
import { AchievementSchema } from '../mongooseModels/AchievementModel';
import express from 'express';
const path = require("path");

const Achievement = mongoose.model('Achievement',AchievementSchema);

export class AchievementController {

    // create a new achievement
    public addNewAchievement(req: express.Request, res: express.Response) {
        if(req.body.score == 10){
            Achievement.findOne({}).where('user_id').equals(req.body.user_id).where('theme').equals(req.body.theme).select('number_achievements').exec((err,achievement)=>{
                if(err){
                    res.json(err);
                }
                if(achievement == null){
                    let achievement = new Achievement(req.body);
                    achievement.save((err, achievement) => {
                        if (err) {
                            res.send(err);
                        }
                        else
                            res.status(200).json(achievement);
                    });
                }
                if(achievement != null){
                    console.log(achievement);
                    let number_achievements = achievement['number_achievements'] + 1;
                    Achievement.findOneAndUpdate({ user_id: req.body.user_id, theme: req.body.theme }, { $push: { "number_achievements": number_achievements} }, (err, achievement) => {
                        if (err) {
                            res.send(err);
                        }
                        else
                            res.status(200).json(achievement);
                    });
                }
            }); 
            
        }
        else
            res.json({message: 'Not achievement'});
    }

    // get all achievements
    public getAchievements(req: express.Request, res: express.Response) {
        Achievement.find({}).where('user_id').equals(req.params.userId).exec((err,achievements)=>{
            if(err){
                res.json(err);
            }
            if(achievements.length == 0){
                res.status(404).json({message: 'Not achievements'});
            }
            if(achievements.length != 0){
                res.status(200).json(achievements);
            }    
        }); 

    }
}

