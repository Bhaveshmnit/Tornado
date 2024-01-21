class CustumApiError extends Error{
        //we cereate this class so that we can pass(msg,error) directly 
        //we use this to thow custum error at places we want
        constructor(message,statusCode){
                super(message)
                this.statusCode=statusCode
        }
}
//exported at many places
//this is handled by erorhandler middleware
module.exports=CustumApiError