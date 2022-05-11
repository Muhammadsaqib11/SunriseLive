const InspectionQuestion = require("../models/inspection_questions");

const inspection_questions_controller = {
  addInspectionQuestion: (req, res) => {
    const arr =[     {"inspection_category_id":"611267e289c98f37d459d601","title":"Drive Belts Condition","Classificatiion":"Negative","data":{"observation":"Cracked","observation_extended":"One or more of the engine's drive belts is cracked.","recommendation":"Recheck - Serp Belt","recommendation_extended":"Your vehicle's serpertine belt is due to be replaced soon but is in good condition at this time. We will recheck the belt at your next service."}}

  ];
    console.log(arr)
    arr.map((item)=>{
      const cat_id = item.inspection_category_id;
      const qtitle = item.title;
      InspectionQuestion.find({title:`${qtitle}`}).exec((err,doc)=>{
        console.log(doc)
        if(doc.length === 0){
          let NA = '';
          let Positive = '';
          let Negative = '';
          if(item.Classificatiion === "NA"){
            NA = item.data
          }
          if(item.Classification === "Positive"){
            Positive = item.data
          }
          console.log(Positive)
          if(item.Classificatiion === "Negative"){
            Negative = item.data
          }
          console.log(Negative)
          const a = {'title':`${qtitle}`,'inspection_category_id':`${cat_id}`,'positive_list':Positive,'negative_list':Negative,'na_list':`${NA}`}
          const data = new InspectionQuestion();
         console.log(a)
          // data.save((err, doc) => {
          //     if (!err) {
          //       res.send(doc);
          //     }
          //   }); 
        }
      })
    })
    // const data = new InspectionQuestion(req.body);
    // console.log(req.body);
    // data.save((err, doc) => {
    //   if (!err) {
    //     res.send(doc);
    //   }
    // });
    // InspectionQuestion.insertMany([
      // { title: 'Bypass Hose',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: 'Clamps',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: 'Fan',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: 'Heater Hoses',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: 'Inspect Radiator & Hoses',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: 'Lower Radiator Hose',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: 'Pressure Cap',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: 'Radiator',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: 'Radiator & Hoses',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: '',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: '',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: '',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: '',inspection_category_id:'611267e289c98f37d459d5ff' },
      // { title: 'Brake Lines // Hoses Condition',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Brake Lines Condition',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Road Test: Brake Pulsation or Noises',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Road Test: Brake System Operation',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Road Test: Brake System Perfomance',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Brake Warning Light',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Front Brake Calipers and Hoses',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Front Brake Pads',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Front Brakes',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Inspect Front Brakes',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Inspect Rear Brakes ',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Perform Brake Fluid Service',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Rear Brake Calipers/Wheel Cylinders and Hoses',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Rear Brake Pads/Shoes',inspection_category_id:'611267e289c98f37d459d5fc' },
      // { title: 'Rear Brakes',inspection_category_id:'611267e289c98f37d459d5fc' },
  // ])
  },
  getAllInspectionQuestions: (req, res) => {

    InspectionQuestion.aggregate([
      
      {
        $group : { _id : "$inspection_category_id", questions: { $push: "$$ROOT" } }
      },
      {
        $lookup:
          {
            from: "inspection_categories",
            localField: "_id",
            foreignField: "_id",
            as: "categories"
          },
         
     },
     {
      $unwind: '$categories'
  }
    ])
    .exec((err, doc) => {
          if (err) return res.status(400).send(err);
          res.send(doc);
          console.log(doc);
        });

    // InspectionQuestion.find()
    //   .populate("inspection_category_id")
    //   .exec((err, doc) => {
    //     if (err) return res.status(400).send(err);
    //     res.send(doc);
    //     console.log(doc);
    //   });
  },
  getAllInspectionQuestionsByCategory: (req, res) => {
    
    InspectionQuestion.find({inspection_category_id:req.query.id})
      .populate("inspection_category_id")
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
        console.log(doc);
      });
  },
 
  updateInspectionQuestionsById: (req, res) => {
    console.log(req.body)
    InspectionQuestion.findByIdAndUpdate({_id:req.body.id},
      {positive_list:req.body.positive,negative_list:req.body.negative,neutral_list:req.body.neutral,na_list:req.body.na},
      (err, data)=>{
      res.send(data)
      // console.log(data)
    })
  },
};

module.exports = inspection_questions_controller;
