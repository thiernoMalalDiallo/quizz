var crypto = require('crypto');

export class Util{
// send a random number to be used
    public static getRandom(length:any):any {
        // valeur attendu : [0, length[
        return Math.trunc(Math.random() * Math.trunc(length));
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

    public static updateRanking(users:any){
        let i:any;
        let j:any;
        let tmp = Array();
        for(i = 0; i < users.length; i++){
            tmp[i] = users[i].scores.score_global;
        }
        tmp.sort(this.compare);
      
        for(i = 0; i < tmp.length; i++){
            for(j = 0; j < users.length; j++){
                if(tmp[i] == users[j].scores.score_global){
                    users[j].ranking = i+1;
                }
            }
        }
        return users;
    }
    
    public static updateScoreThemeAndAchievement(scoresTheme:any, theme:any, score:any){
        let i:any;
        theme = theme.toLowerCase();
        let enter:boolean = false;
        for(i = 0; i < scoresTheme.length; i++){
            if(scoresTheme[i].theme == theme){
                scoresTheme[i].score =  scoresTheme[i].score + score;
                if(score == 10){
                    scoresTheme[i].numberOfTrophy = scoresTheme[i].numberOfTrophy + 1;
                }
                enter = true;
                break;
            }
        }
        if(enter == false){
            let newScoreTheme = {
                theme:	theme,
                score:	score,
                numberOfTrophy: 0
            }
            if(score == 10){
                newScoreTheme.numberOfTrophy = 1;
            }
            scoresTheme.push(newScoreTheme);
        }
        return scoresTheme;
    }

    private static compare(x:any, y:any) {
        return y - x;
    }
    
}