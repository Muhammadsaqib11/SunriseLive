const InspectionTest = require("../models/inspection_tests");
const InspectionCategory = require("../models/inspection_categories");
const InspectionQuestion = require("../models/inspection_questions");


const inspection_category_controller = {
  addInspectionTest: (req, res) => {
    const cat = new InspectionTest(req.body);
    console.log(req.body);
    cat.save((err, user) => {
      if (!err) {
        res.send(user);
      }
    });
  },
  getAllInspectionTests: (req, res) => {
    InspectionTest.find().exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
  },

  getAllInspectionTestsForEdit: (req, res) => {
    InspectionTest.find().exec((err, doc) => {
      let categories = [];
      let questionArr = [];
      // let catCount = 0;
      let testArr = [];
      let testCount = doc.length;
      doc.map((test, indx) => {
        let catCount = test.inspection_categories.length;
        // let 
        test.inspection_categories.map((cat,catIndex) => {
          const q = cat.questions.length;
          let count = 0;
          let qus = [];
          categories.push(cat.id);

          // console.log(categories,'category_updates')
          cat.questions.map((q_id, i) => {
            InspectionQuestion.findOne({ _id: q_id })
              .populate("inspection_category_id", "name")
              .exec((err, data) => {
                count += 1;

                let obj = {
                  name: data.inspection_category_id.name,
                  id: data.inspection_category_id._id,
                };
                if (obj.id == cat.id) {
                  qus.push(data);

                  // console.log(data)
                  obj["questions"] = qus;
                }
                // console.log(qus)

                if (i === q - 1 && cat.id == data.inspection_category_id._id) {
                  let testobj = {
                    questions: qus,
                    cat_id: data.inspection_category_id._id,
                    categorries: {
                      name: data.inspection_category_id.name,
                      id: data.inspection_category_id._id,
                    },
                  };
                  console.log({ questionArr });
                  // console.log({ categories });
                  questionArr.push(testobj);
                  console.log({ testCount });
                  console.log({ indx });
                  console.log({catIndex});
                  console.log({ catCount });
                  console.log({ count });
                  console.log({ q });
                  console.log(indx === testCount - 1);
                  if (catIndex === catCount-1 && count >= q && indx === testCount - 1) {
                    // console.log(data);
                    
                    res.json({
                      title: doc[0].title,
                      data: questionArr,
                      cat:categories
                    });
                  }
                }
              });
          });
        });
      });
    });
  },
  getInspectionTestById: async (req, res) => {
    let cat = [];
    let arr = [];
    let qus = [];
    let totalQuestions = 0;
    let totalQCount = 0;
    let catlength = 0;
    //   console.log(req.query,'abcd');
    await InspectionTest.findOne({ _id: req.query.id }).exec((err, doc) => {
      if (err) return res.status(400).send(err);
      if (doc !== null) {
        catlength = doc.inspection_categories.length;
        // console.log(catlength)
        doc.inspection_categories.map((cate, i) => {
          let qCount = 0;
          let questionCount = cate.questions.length;
          totalQuestions += questionCount;
          InspectionCategory.findOne({ _id: cate.id }).exec(
            async (err, category) => {
              if (err) return res.status(400).send(err);

              //newcategory = category;
              // console.log(newcategory,'check2')

              cat.push({ name: category.name, id: category._id });
              // console.log(cat.length,'category_updates')

              let obj = { name: category.name, id: category._id };
              let q = [];
              cate.questions.map(async (questionId) => {
                // console.log(cat)
                await InspectionQuestion.findOne({ _id: questionId }).exec(
                  async (err, questions) => {
                    if (err) return res.status(400).send(err);
                    qCount += 1;
                    totalQCount += 1;

                    if (obj.name === category.name) {
                      q.push(questions);
                      await qus.push(questions);
                      obj["questions"] = q;
                      // console.log(obj);
                    }

                    if (questionCount === qCount) {
                      arr.push(obj);
                    }
                    console.log({ totalQuestions }, { totalQCount });
                    if (
                      cat.length >= catlength &&
                      questionCount === qCount &&
                      // i === catlength - 1 &&
                      totalQuestions === totalQCount
                    ) {
                      // console.log(arr)
                      res.json({
                        title: doc.title,
                        _id: doc._id,
                        // CAT: arr,
                        categories: cat,
                        qusetions: qus,
                      });
                    }
                    //   res.json({
                    //     title: doc.title,
                    //     CAT: arr,

                    //   });
                    // }
                  }
                );
              });

              //                   await InspectionQuestion.find({inspection_category_id: category._id})
              //                   .exec( (err, questions) => {
              //                     if (err) return res.status(400).send(err);

              //                     qCount+=questions.length;
              //                     let count = 0
              //                     console.log(qCount)
              //                      questions.map(ques =>{

              //                         q.push(ques);
              //                         console.log(i)
              //                         console.log(cat)

              //                       })
              //                       // console.log(cat.length >= catlength && qCount >= catlength && qCount >= q.length && i === catlength-i )
              // if(cat.length >= catlength && qCount >= catlength && qCount >= q.length && i === catlength-1){

              //                                 console.log('check')
              //                                 res.json({
              //                                     title:doc.title,
              //                                     CAT:cat,
              //                                     category:q
              //                                   })

              //                           }
              //                     console.log(q, "qu");
              //                   });
              // console.log(cat.length,'cate')
              // console.log(catlength,'catlength')
            }
          );
        });

        //console.log(cat,'cat')
      }
    });
  },

  //   getCustomerVehicles: (req, res) => {
  //     console.log(req.body)
  //     Vehicle.find({customer:req.body.vehicle}, (err, data)=>{
  //       res.send(data)
  //       // console.log(data)
  //     })
  //   },
};

module.exports = inspection_category_controller;
