const mongoose = require("../config/config");

const inspectionQuestionsSchema = new mongoose.Schema(
  {
    inspection_category_id: {
        type: mongoose.Schema.Types.ObjectId,
      ref: "inspection_categories",
    },
    title: String,
    option_list:[],
    positive_list:[], 
    negative_list:[],
    neutral_list:[],
    na_list:[],
  },
  { timestamps: true }
);

const inspection_questions = mongoose.model("inspection_questions", inspectionQuestionsSchema);

module.exports = inspection_questions;
