var crypto = require('crypto');

export class Util{
// send a random number to be used
    public static getRandom(length:any):any {
        // valeur attendu : [0, length[
        return Math.trunc(Math.random() * Math.trunc(length));
    }
    public static getexcludedQuizId(req:express.Request,res:express.Response):any{
        // var tab: Array<any> = [];
        // var date:String= moment().subtract(5, 'days').format('YYYY-MM-DD').toString()+"";
        // User.findOne({}).where("_id").equals(req.params.userId).select('scores.score_quiz').exec((err, score_quiz) => {
        //     if (err) {

    public static getNumberAchievements(Achievement:any, userId:any, theme:any){
        Achievement.findOne({}).where('user_id').equals(userId).where('theme').equals(theme).select('number_achievements').exec((err:any,achievement:any)=>{
            if(err){
                return err;
            }

                return achievement;
            }); 
    }

    public static isExistAchievement(Achievement:any, userId:any, theme:any){
        var result;
        Achievement.find({}).where('user_id').equals(userId).where('theme').equals(theme).select('number_achievements').exec((err:any,achievement:any)=>{
            if(err){
                return err;
            }
                result = achievement;
            }); 
    }

    /**
     * Hash and salt password with SHA512 algorithm
     * @param {String} password 
     */
    public static hashPassword (password:any) {
        var salt= 'Spiderman';
        var hash= crypto.createHmac('sha512', salt); // Hashing algorithm sha512
        hash.update(password);
        return hash.digest('hex');
    }

}