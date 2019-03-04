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

}