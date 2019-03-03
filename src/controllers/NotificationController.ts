import * as mongoose from 'mongoose';
import { NotificationSchema } from '../mongooseModels/NotificationsModel';
import express from 'express';

const Notification = mongoose.model('Notification',NotificationSchema);

export class NotificationController {

    public notify(req: express.Request, res: express.Response) {
       console.log(req.body);
        let notification = new Notification(req.body);
        notification.save((err,notification) => {
            if(err){
                res.json(err);
            }
            res.status(200).json(notification);
        })
    }

    public getNotifications(req: express.Request, res: express.Response) {
        Notification.find({}).where('user_id_notified').equals(req.params.userId).select('_id user_id_notified user_id_who_notify id_quiz subject').exec((err,notifications)=>{
            if(err){
                res.json(err);
            }
                res.status(200).json(notifications);
            }); 
    }

    public deleteNotification(req: express.Request, res: express.Response) {
        Notification.remove({ _id: req.params.quizNotification }, (err) => {
            if (err) {
                res.status(400).json(err);
            }
            res.status(200).json({ message: 'Successfully deleted notification!' });
        }); 
    }
}

