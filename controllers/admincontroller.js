const COURTS= require('../models/courtModel')


const createnewcourt=(req,res)=>{
    const {
        name,
        location,
        type,
        address3,
        address2,
        address1,
        landMark,
        pin,
        contactNumber,
        description

}=req.body;
const pics=req.files.map((file)=>{return{name:file.filename,type:file.mimetype}})
COURTS({
    name,
    location,
    type,
    address3,
    address2,
    address1,
    landMark,
    pin,
    contactNumber,
    description,
    courtPics:pics

}).save().then((response)=>{
    res.status(200).json({message:'court added successfully'})
})
.catch((err)=>{
    console.log(err);
    res.status(500)
})
}
module.exports={createnewcourt};