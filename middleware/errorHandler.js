const {constants}= require("../constants")
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({Title:"Validation failed",message:err.message,stackTrace:err.stack})
            break;
        case constants.NOT_FOUND:
            res.json({Title:"Not found",message:err.message,stackTrace:err.stack})
            break;

         case constants.FORBIDDEN:
             res.json({Title:"Forbidden",message:err.message,stackTrace:err.stack})
             break;
        case constants.SERVER_ERROR:
            res.json({Title:"server error",message:err.message,stackTrace:err.stack})
            break;
        case constants.UNAUTHORIZED:
            res.json({Title:"unauthorize",message:err.message,stackTrace:err.stack})
            break;
        default:
            console.log("no error! All good!");
            break;
    }
   
}
module.exports = errorHandler;