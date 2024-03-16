//***Clousers */
//outer function
const authorise = (role_arr)=>{

    //inner function
    return(req,res,next)=>{
        const userrole = req.body.userrole
        if(role_arr.includes(userrole)){
            next()
        }
        else{
            res.send("Not authorised, sorry, You cannot able to access the route")
        }
    }
}


module.exports = {authorise}