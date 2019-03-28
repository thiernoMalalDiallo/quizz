import * as mongoose from 'mongoose';
import express from 'express';
import { NotificationSchema } from '../mongooseModels/NotificationsModel';

const Notification = mongoose.model('Notification',NotificationSchema);

export class NotificationController {

    public notify(req: express.Request, res: express.Response) {
       console.log(req.body);
        let notification = new Notification(req.body);
        notification.save((err,notification) => {
            if(err){
                res.json(err);
            }
            else{
                res.status(200).json(notification);
            }
           
        });
    }

    public getNotifications(req: express.Request, res: express.Response) {
        Notification.find({}).where('user_id_notified').equals(req.params.userId).exec((err,notifications)=>{
            if(err){
                res.json(err);
            }
            if(notifications.length == 0){
                res.status(404).json({ status: 404, message: 'not Notifications'});
            }
            if(notifications.length != 0){
                res.status(200).json(notifications);
            }           
        }); 
    }

    public deleteNotification(req: express.Request, res: express.Response) {
        Notification.remove({ _id: req.params.idNotification }, (err) => {
            if (err) {
                res.status(400).json(err);
            }
            else{
                res.status(200).json({ message: 'Successfully deleted notification!' });
            }
        }); 
    }
}

