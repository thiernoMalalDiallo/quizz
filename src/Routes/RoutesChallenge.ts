import express from "express";
import {ChallengeController} from './../controllers/ChallengeController';
export class RoutesChallenge {
    public challengeController: ChallengeController = new ChallengeController();
    public routes(app: any) {
        /*==================== ROUTES FOR Challenge ========================*/
        app.route("/challenges/challengeAfriend/:action").
        post(this.challengeController.challengeAfriend);

        app.route("/challenges/getHistoric/:userId").
        get(this.challengeController.getHistoricUser);
        
        app.route("/challenges").
        post(this.challengeController.addDailyQuiz);

        app.route("/challenges/:type").
        get(this.challengeController.getChallenges)
 
    }
}