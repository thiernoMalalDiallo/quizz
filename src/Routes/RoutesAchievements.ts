import {AchievementController} from './../controllers/AchievementsController';
export class RoutesAchievement{
    public achievementController:AchievementController = new AchievementController();
    public routes(app:any){
        app.route('/achievement')
        .get(this.achievementController.addNewAchievement);
    }
}