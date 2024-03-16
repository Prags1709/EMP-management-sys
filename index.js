const express = require("express");
const {emplo_manager} = require("./route/data.route")
const {sequelize} = require("./config/db")
const {userRoute} = require("./route/user.route")
const {authenticate} = require("./middleware/authentication.mid")

const app = express()
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("WELCOME TO THE EMPLOYEE MANAGEMENT APP")
})

app.use("/user", userRoute)
app.use(authenticate)
app.use("/emplo", emplo_manager)

app.listen(2121,async ()=>{
    try {
        await sequelize.authenticate()
        console.log("Connection successfull");
    } catch (error) {
        console.log(error);
    }
    console.log("Port running at 2121");
})


//    *****MINI DOCUMENTATION******    //

//API END-POINTS
//user create
  // -/user/register
        // -name
        // -email
        // -password
        // -role

  //  -/user/login
        // -email
        // -password
        
//employe detail    ********USE ROLE ONLY = MANAGER**********
  //  -/emplo/add
  
    // "employee_id": "002",
    // "first_name": "Jane",
    // "last_name": "Doe",
    // "email": "jane.doe@company.com",
    // "phone_number": "+1 (123) 456-7890",
    // "department": "Marketing",
    // "job_title": "Marketing Manager",
    // "hire_date": ISODate("2019-02-15T00:00:00Z"),
    // "salary": 75000,
    //   "street": "123 Main St",
    //   "city": "Anytown",
    //   "state": "CA",
    //   "zip": "12345",
    //   "country": "USA"
    //   "access_type":"manager"

//employee apply leave    ********USE ROLE ONLY = EMPLOYEE**********

    //  -/emplo/leave
        // "employee_id": (employee_id),
        // "leave_type": "Vacation",
        // "start_date": ISODate("2023-03-15T00:00:00Z"),
        // "end_date": ISODate("2023-03-20T00:00:00Z"),
        // "reason": "Taking a short break",
        // "status": "Approved",
        // "approved_by":(manager_id)

//tracking/monirot their leave    ********USE ROLE ONLY = EMPLOYEE**********

    //  -/emplo/leave/treak/:id => employee_id

//delete their leave  ********USE ROLE ONLY = EMPLOYEE**********
    // -/emplo/leave/delete/:id => employee_id

//approvel API  ********USE ROLE ONLY = MANAGER**********

    //  -/emplo/leave/approval/:id => employee_id

//Leave data
    
    // -emplo/all