const express =require("express")
const {sequelize} = require("../config/db")
const {Employee} = require("../model/employee.model")
const {Leave} = require("../model/leave.model")
const {authorise} = require("../middleware/authorize")

const emplo_manager = express()

//*****EMPLOYEE DATA INSERT BY MANAGER**** */
emplo_manager.post("/add", authorise(["manager"]), async (req,res)=>{
   const {employee_id,
          first_name,
          last_name,
          email,
          phone_number,
          department,
          job_title,
          hire_date,
          salary,
          street,
          city,
          state,
          zip,
          country,
          access_type} = req.body
    await sequelize.sync()
    try {
        await Employee.create({employee_id,
            first_name,
            last_name,
            email,
            phone_number,
            department,
            job_title,
            hire_date,
            salary,
            street,
            city,
            state,
            zip,
            country,
            access_type})
        res.send("Employee data created success")
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, something went wrong.');
    }
})

//*****LEAVE DATA INSERT BY EMPLOYEE**** */

emplo_manager.post("/leave",authorise(["employee"]) , async (req,res)=>{
    const {employee_id,
        leave_type,
        start_date,
        end_date,
        reason,
        access_type} = req.body
   await sequelize.sync()

   try {
        await Leave.create({employee_id,
            leave_type,
            start_date,
            end_date,
            reason,
            status:"PENDING",
            access_type}) 
        res.send("Leave application has been created")
   } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, something went wrong.');
   }
})

//*********EMPLOYEE TRACKING THE DATA WITH HIS "employee_id" */
emplo_manager.get("/leave/track/:id",authorise(["employee"]), async (req,res)=>{
    let id = req.params.id;
    try {
        let data =await Leave.findAll({
            where:{employee_id: id}, 
        })
        //console.log(data.length);
        if(data.length==0){
            res.send("NO DATA")
        }else{
            res.send(data)
        }
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, something went wrong.');
    }
})

//********LEAVE DELETE BY EMPLOYEE***** */
emplo_manager.delete("/leave/delete/:id",authorise(["employee"]), async (req,res)=>{
    let id = req.params.id;
    try {
        let data =await Leave.destroy({
            where:{employee_id: id}, 
        })
        //console.log(data.length);
        res.send("Leave data has been deleted")
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, something went wrong.');
    }
})

//*****ALL LEAVE DATA */
emplo_manager.get("/all", authorise(["manager"]), async (req,res)=>{
    try {
        let Leave_data = await Leave.findAll()
        res.send(Leave_data)
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, something went wrong.');
    }
})

//********APPROVEL ROUTE by manager useing employee ID**** */
emplo_manager.patch("/leave/approval/:id", authorise(["manager"]), async (req,res)=>{
    let id = req.params.id;
    let add = req.body //=> {status: "REJECT"}
    let apro_id = req.body.user_id
    //let employee_data = await Leave.findOne({where: {employee_id: id}})
    //console.log(apro_id);
    // res.send("ok")
    add['approved_by'] = apro_id //=>{status: "REJECT", approved_by: 4} = add
    console.log(add);
    try {
        let data =await Leave.update(
             add,
            {where:{employee_id: id}}
        )
        //console.log(data.length);
        res.send("updated")
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, something went wrong.');
     }
})

module.exports = {emplo_manager}

// {
//     "employee_id":1,
//     "first_name":"prags",
//      "last_name":"Rai",
//               "emile":"p@gmail.com",
//               "phone_number":"66766554435",
//               "department": "Developer",
//               "job_title": "SD2",
//              "hire_date": "15-04-2023",
//               "salary": 80000,
//               "street":"south street",
//               "city": "perambalur",
//               "state": "tamilnadu",
//               "zip":"621704",
//               "country": "india",
//               "access_type":"manager"
    
//   }

///LEAVE DATA
// {
//     "employee_id":4,
//     "leave_type": "personal leave",
//     "start_date": "2023-03-16",
//     "end_date": "2023-03-19",
//     "reason": "I have a personal work",
//     "access_type":"manager"
//   }