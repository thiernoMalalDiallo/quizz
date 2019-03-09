import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
// class Quiz avec mongoose
export const AchievementSchema = new Schema({
   
    user_id : {
        type : String
    },

    theme : {
       type : String
    },

    number_achievements : {
       type : Number,
       default : '1'
    }

}); 