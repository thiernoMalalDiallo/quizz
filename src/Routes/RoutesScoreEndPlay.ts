import {ScoreEndPlayController} from './../controllers/ScoreEndPlayController';
export class RoutesScoreEndPlay{
    public scoreEndPlayController:ScoreEndPlayController = new ScoreEndPlayController();
    public routes(app:any){
        
        app.route('/end-play')
        .post(this.scoreEndPlayController.saveScorePlay);
    }
}