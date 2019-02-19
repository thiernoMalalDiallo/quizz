"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const RoutesUser_1 = require("./Routes/RoutesUser");
const RoutesQuiz_1 = require("./Routes/RoutesQuiz");
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    //
    constructor() {
        //public mongoUrl: string = 'mongodb://localhost/Quizz';
        this.mongoUrl = 'mongodb://quizzProject:mongo1995@ds139775.mlab.com:39775/quizz';
        //routes
        this.routeUser = new RoutesUser_1.RoutesUser();
        this.routeQuiz = new RoutesQuiz_1.RoutesQuiz();
        this.app = express_1.default();
        this.config();
        this.routeUser.routes(this.app);
        this.routeQuiz.routes(this.app);
        this.mongoSetup();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } } };
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(this.mongoUrl, options);
        /*
        local mongodb
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl,{ useNewUrlParser: true });*/
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map