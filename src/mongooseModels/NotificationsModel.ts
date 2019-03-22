import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const NotificationSchema = new Schema({
   
    user_id_notified : {
        type : String
    },

    user_id_who_notify : {
       type : String
    },

    id_quiz : {
        type : String,
        default : 'no quiz'
    },

    subject : {
       type : String
    },
    p_jObject:Schema.Types.Mixed
    ,
    date:{
        type: Date,
        default: Date.now
    }
}); 