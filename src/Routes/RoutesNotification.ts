import {NotificationController} from './../controllers/NotificationController';
export class RoutesNotification{
    public notificationController:NotificationController = new NotificationController();
    public routes(app:any){
        app.route('/notification')
        .post(this.notificationController.notify);

        app.route('/notifications/:idUser')
        .get(this.notificationController.getNotifications);
        
        app.route('/notification/:idNotification')
        .delete(this.notificationController.deleteNotification);
    }
}