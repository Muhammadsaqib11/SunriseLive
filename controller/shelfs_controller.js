const Shelfs = require('../models/shelfs');

const shelfs = {
    addNewShelfs: (req, res)=>{
        Shelfs.find({}).exec((err, rack)=>{
            if(rack.length === 0){
                let no = 1;
                for(let i=0; i<req.body.noOfShelfs; i++){
                    const newShelfs = new Shelfs({...req.body,no})
                    no++

                    newShelfs.save((err,doc) => {
                        
                        if(err){
                            res.status(400).json({error:err.message})
                            return
                        }
                        if(i===req.body.noOfShelfs-1){
                            res.json({success: true})
                        }
                    })
                    
                }
            }else{
                Shelfs.aggregate([
                    { $group: { _id: null, num: { $max: "$no" } } },
                    { $project: { _id: 0, num: 1 } },
                  ]).exec(function (error, doc) {
                      if(error) return res.status(400).json({error:error.message});
                    const count = doc[0].num;
                    let no = count;

                    for(let i=0; i<req.body.noOfShelfs; i++){
                        // console.log("rack",no)
                        no++;
                        const newShelfs = new Shelfs({...req.body,no})
    
                        newShelfs.save((err,data) => {
                            
                            if(err){
                                res.status(400).json({error:err.message});
                                 return;
                            }

                            // console.log(i===req.body.noOfShelfs-1)
                            if(i===req.body.noOfShelfs-1){
                                res.json({success: true})
                            }
                        })
                        
                    }
                
                
                })
            }
        })
    },
    getAllShelfs: (req, res) => {
        const pageNo = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    const skip = size * pageNo;
        let count =  0;
        Shelfs.countDocuments({},function(err,doc){count=doc})
        Shelfs.find({})
        .sort({ $natural: -1 })
        .skip(skip)
        .limit(size)
        .populate({
            path: 'rack_id',
            select:'no',
            populate:{
                path:'warehouse_id',
                select:'no'
            }
        })
        .exec((err, doc)=>{
            if(err) return res.status(400).json({error: err.message})
            res.json({success: true,shelfs:doc,totalDoc:count})
        })
    },
    getShelfsByRackId: (req, res) => {
        Shelfs.find({rack_id:req.query._id})
        .sort({ $natural: -1 })
        .populate({
            path: 'rack_id',
            select:'no',
            populate:{
                path:'warehouse_id',
                select:'no'
            }
        })
        .exec((err, doc)=>{
            if(err) return res.status(400).json({error: err.message})
            res.json({success: true,shelfs:doc})
        })
    }
    
}

module.exports = shelfs