"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
// class Quiz avec mongoose
exports.QuizSchema = new Schema({
    QuizName: {
        type: String
    },
    Questions: [
        {
            Question: {
                type: String
            },
            Possible_Answers: [
                {
                    Possible_Answer: {
                        type: String
                    }
                }
            ],
            True_Answer: [
                {
                    Answer: {
                        type: String
                    }
                }
            ]
        }
    ],
    Level: {
        type: String
    },
    Theme: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    played: {
        type: Number,
        default: 0
    }
});
//# sourceMappingURL=QuizModel.js.map