import * as express from 'express';
import {ScoresController} from './../controllers/ScoresController'
export class RoutesScore{
    public  scoresController:ScoresController= new ScoresController();
    public routes(app:express.Application){

        
        app.route('/scores/top').
        get(this.scoresController.getTopScore)

        app.route('/scores/top/:theme').
        get(this.scoresController.getTopScoreByTheme)

        app.route('/scores/:userId')
        .get(this.scoresController.getScores);

        app.route('/scores/globalScore/:userId')
        .get(this.scoresController.getGlobal_Score) 
        .post(this.scoresController.updateGlobal_Score);
        
        app.route('/scores/score_quiz/:userId')
        .get(this.scoresController.getScore_quiz)
        .put(this.scoresController.updateScore_quiz);

    }
}