import express from "express";
import * as bodyParser from "body-parser";
import {RoutesUser} from "./Routes/RoutesUser";
import {RoutesQuizz} from "./Routes/RoutesQuizz";
import mongoose from "mongoose";
class App {
    
    //public mongoUrl: string = 'mongodb://localhost/Quizz';
    private mongoUrl: string = 'mongodb://quizzProject:mongo1995@ds139775.mlab.com:39775/quizz'; 
    public app: express.Application;
    //routes
    public routeUser: RoutesUser = new RoutesUser();
    public routeQuizz: RoutesQuizz= new RoutesQuizz();
    //
    constructor() {
        this.app = express();
        this.config();     
        this.routeUser.routes(this.app); 
        this.routeQuizz.routes(this.app);  
        this.mongoSetup(); 
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    
    private mongoSetup(): void{
        var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl,options); 
       
        /*
        local mongodb
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl,{ useNewUrlParser: true });*/    
    }

}

export default new App().app;