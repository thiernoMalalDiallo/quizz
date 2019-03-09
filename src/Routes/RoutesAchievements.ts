import {AchievementController} from './../controllers/AchievementsController';
export class RoutesAchievement{
    public achievementController:AchievementController = new AchievementController();
    public routes(app:any){
        
        app.route('/achievement')
        .post(this.achievementController.addNewAchievement);

        app.route('/achievements/:userId')
        .get(this.achievementController.getAchievements);
    }
}