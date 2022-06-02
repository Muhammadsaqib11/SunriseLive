const mongoose = require("../config/config");

const inspectionResultSchema = new mongoose.Schema(
  {
    inspection_test_id: {
        type: mongoose.Schema.Types.ObjectId,
      ref: "inspection_tests",
    },
   wo_id: {
        type: mongoose.Schema.Types.ObjectId,
      ref: "WorkOrder",
    },
    title: String,
    results:[],
    categories:[],
    recomended_parts:[],
    progress_status:Boolean,
    
  },
  { timestamps: true }
);

const inspection_results = mongoose.model("inspection_results", inspectionResultSchema);

module.exports = inspection_results;
