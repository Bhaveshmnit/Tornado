const notFound=(req,res)=>{
        //we put this middleware at the last so that if any route not found
        //we send default route
        res.status(400).send('Cannot found route')
}
//export to app.js used in app.use(notFound)
module.exports=notFound