import {ScoreEndPlayController} from './../controllers/ScoreEndPlayController';
export class RoutesScoreEndPlay{
    public scoreEndPlayController:ScoreEndPlayController = new ScoreEndPlayController();
    public routes(app:any){
        
        app.route('scores/end-play/:userId')
        .post(this.scoreEndPlayController.saveScorePlay);
    }
}