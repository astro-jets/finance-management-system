// Libralies
const imageMimeTypes = ['image/jpeg','image/png','image/ico']
const moment = require('moment');
const fs = require('fs')
const jwt = require('jsonwebtoken') 

// Models
const User = require('../models/User')  
const Student = require('../models/Student')
const Asset = require('../models/Asset')
const Fund = require('../models/Fund')
const Budget = require('../models/Budget')
const Salary = require('../models/Salary')
const Staff = require('../models/Staff')
const Fees = require('../models/Fees')

const maxAge = 3 * 24 * 60 * 60

// Create Token
const createToken = (id)=>{
    return jwt.sign({id},process.env.TOKEN_SECRET,{
        expiresIn: maxAge
    });
}

// Handle Errors
const handleErrors = (err)=>{
    let errors = {
        username:'',
        email:'',
        password:''
    }
    // Email error
    if(err.message === 'Incorrect Email')
    {
        errors.email = "That email is not registred."
    }
    
    // Password error
    if(err.message==='Incorrect Password'){
        errors.password = "The password incorrect."
    }
    
    // Validating errors
    if(err.code === 11000){
        errors.email = "That email is already registred."
        return(errors)
    }
    if(err.message.includes('user validation failed'))
    {
        Object.values(err.errors).forEach(properties=>{
            errors[properties.path] = properties.message
        })
    }

    return(errors)
    
}

// Dashoboard
module.exports.dashboard= async (req,res)=>{ 
    try{
        const balances = await getBalances();
        const expenditure = await monthlyExpenditure();
        const payee = await monthlyPayee();
        const assets = await Asset.find();
        const students = await Student.find();
        const earns = await monthlyEarnings();

        await makeReports();

        res.render('index',{
            payee:payee.toLocaleString(),
            exp:expenditure.toLocaleString(),
            earns:earns.toLocaleString(),
            balances: balances[0],
            totalBalances: balances[1].toLocaleString(),
            assets:assets.length,
            students:students.length
        })
    }
    catch(err){res.send(err.message)}
}

module.exports.dashboardPost= async (req,res)=>{
    const student = await Student.findOne({studentId:req.body.studentID});
    console.log(student)
    res.send(student);
}
// Profile
module.exports.profile= async (req,res)=>{ 
    try{
        const user = res.locals.user
        const message = await Message.findOne({user:user._id})
            
        const data ={
            id:message._id,
            thread:[]
        } 
        for (let i = 0; i < message.thread.length; i++) {
            const t = message.thread[i];
            data.thread.push({
                response:t.message,
                from:t.from,
                date:moment(t.time).calendar(),
            })            
        }
        
        res.render('profile/index',{
            user: user,
            data:data,
            layout:'layouts/noheader'
        })
    }
    catch(err){res.send(err.message)}
}

//All Students
module.exports.allStudents = async (req,res)=>{
    try{
        const students = await Student.find();
        res.render('students/index',{students:students})    

    }catch(err){
        res.send(err.message)
    }
}
//All Students

//New Student
module.exports.newStudent = async (req,res)=>{
    try{
        const {firstname,lastname,phone,email,level,studentId} = req.body;
        const student = await Student.create({firstname,lastname,phone,email,level,studentId})
        res.status(200).json({student});    

    }catch(err){
        res.send(err.message)
    }
}
//New Student

//All Staff
module.exports.allStaff = async (req,res)=>{
    try{
        const staff = await Staff.find();
        res.render('staff/index',{staff:staff})    

    }catch(err){
        res.send(err.message)
    }
}
//All Staff

//New Staff
module.exports.newStaff = async (req,res)=>{
    try{
        const {firstname,lastname,phone,email,department,employmentId} = req.body;
        const staff = await Staff.create({firstname,lastname,phone,email,department,employmentId})
        res.redirect('/staff/')
    }catch(err){
        res.send(err.message)
    }
}
//New Staff

//All Assets
module.exports.allAssets = async (req,res)=>{
    try{
        const ass = await Asset.find();
        res.render('assets/index',{assets:ass})    

    }catch(err){
        res.send(err.message)
    }
}
//All Assets

//New Assets
module.exports.saveAsset = async (req,res)=>{
    try{
        const assetDetails = {
            name:req.body.name,
            price:req.body.price,
            description:req.body.description
        }
        saveimage(assetDetails,req.body.thumbnail)
        const asset = await Asset.create(assetDetails);
        res.redirect('/assets')

    }catch(err){
        res.send(err.message)
    }
}
//New Assets


//All Funds
module.exports.allFunds = async (req,res)=>{
    try{
        const funds = await Fund.find();
        res.render('assets/index')    

    }catch(err){
        res.send(err.message)
    }
}
//All Funds

//Save Funds
module.exports.saveFund = async (req,res)=>{
    try{
        const funds = await Fund.find();
        res.render('assets/index')    

    }catch(err){
        res.send(err.message)
    }
}
//Save Funds

//All Budgets
module.exports.allBudgets = async (req,res)=>{
    try{
        const budgets = await Budget.find();
        const arr = []
        let total = 0;
        for (let i = 0; i < budgets.length; i++) {
            const b = budgets[i];
            for (let a = 0; a < b.items.length; a++) {
                const item = b.items[a];
                total += parseInt(item.cost);
            }
            arr.push({
                id:b._id,
                name:b.name,
                total:total
            })
            total = 0;
        }
        res.render('budgets/index',{budgets:arr})

    }catch(err){
        res.send(err.message)
    }
}
//All Budgets

//Single Budgets
module.exports.singleBudget = async (req,res)=>{
    try{
        const budget = await Budget.findById(req.params.id);
        let total = 0;
        const createdOn = moment(budget.created_on).calendar();
        const duration = {
            start:moment(budget.duration[0]).calendar(),
            end:moment(budget.duration[1]).calendar()}
        for (let i = 0; i < budget.items.length; i++) {
            const a = budget.items[i];
            total+=parseInt(a.cost)
        }
        res.render('budgets/single',{
            budget:budget,
            total:total,
            duration:duration,
            createdOn:createdOn
        })

    }catch(err){
        res.send(err.message)
    }
}
//Single Budgets

//Save Budget
module.exports.addBudget = async (req,res)=>{
    try{
        const budgetDetails = {
            name:req.body.name,
            duration: req.body.duration,
            description:req.body.description,
            items:req.body.items
        }
        const budget = await Budget.create(budgetDetails);
        res.status(200).json(budget);

    }catch(err){
        res.send(err.message)
    }
}
//Saev Budget


//Salary Expenditure
module.exports.salaryExpenditure = async (req,res)=>{
    try{
        const salaryDetails = {
            staff: req.body.employment,
            gross:req.body.gross,
            net:parseInt(req.body.gross) - (parseInt(req.body.gross)*0.15),
            taxRate: "15%",
            taxed:parseInt(req.body.gross)*0.15
        } 

        const q = await Salary.create(salaryDetails);

        res.send(q)

    }catch(err){
        res.send(err.message)
    }
}
//Save Funds


// Earning routes

//New Assets
module.exports.newFees = async (req,res)=>{
    try{
        const student = await Student.findOne({studentId:req.body.studentId});
        if(!student){res.redirect('/earnings/new')}
        const feesDetails = {
            student: student.id,
            ammount: req.body.ammount
        }
        const lastPayment = await Fees.findOne({student:student._id});

        // Check if the student had already paid fees inorder to update balance        
        if(lastPayment){
            lastPayment.ammount = parseInt(lastPayment.ammount) + parseInt(feesDetails.ammount);
            const update = await Fees.updateOne(
                {_id:lastPayment._id},
                {$set:{thread:JSON.parse(JSON.stringify(lastPayment.ammount))}}
            );
            await lastPayment.save();
        }
        // Else create new Payment
        else{const fees = await Fees.create(feesDetails);}

        res.redirect('/earnings/')
        
    }catch(err){
        res.send(err.message)
    }
}
//New Assets
// Earning routes

// Report Routes
//All Reports
module.exports.allReports = async (req,res)=>{
    try{
        res.render('reports/index')
        
    }catch(err){
        res.send(err.message)
    }
}
//All Reports

//Single Reportt
module.exports.singleReport = async (req,res)=>{
    try{
        res.render('/reports/index')
        
    }catch(err){
        res.send(err.message)
    }
}
//Single Report
// Report Routes

//Signup Route
module.exports.signUp = async (req,res)=>{
    
    const userDetails = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        userType:'customer'
    }
    saveimage(userDetails,req.body.avatar)

    try{
        const user = await User.create(userDetails)
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
        res.redirect('/services')
    }
    catch(err)
    {
        const errors = handleErrors(err)
        res.status(201).json({errors})
    }
}
// LogIn Route
module.exports.logIn = async (req,res)=>{
    const{email,password} = req.body;
    try{
        const user = await User.login(email,password)
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(200).json({user:user._id})
    }
    catch(err)
    {
        const errors = handleErrors(err)
        res.json({errors})
    }
}

// LogOut Route
module.exports.logOut = async (req,res)=>{
    try{
        res.cookie('jwt','',{httpOnly:true,maxAge:1})
        res.redirect('/')
    }
    catch(err)
    {
        const errors = handleErrors(err)
        res.json({errors})
    }
}


function saveimage(arr, encodedimage)
{
    if(encodedimage == null){return}
    const image = JSON.parse(encodedimage)
    if(image != null && imageMimeTypes.includes(image.type))
    {
        arr.image = new Buffer.from(image.data, 'base64')
        arr.imageType = image.type
    }
}

async function monthlyExpenditure()
{
    const salaries = await Salary.find();
    const assets = await Asset.find();
    let total = 0;

    for(let i =0 ; i < salaries.length ; i ++)
    {
        let s = salaries[i];
        total += parseInt(s.gross);
    }

    for(let i =0 ; i < assets.length ; i ++)
    {
        let s = assets[i];
        total+=parseInt(s.price);
    }
    return total;
}

async function monthlyEarnings()
{
    const fees = await Fees.find();
    let total = 0;

    for(let i =0 ; i < fees.length ; i ++)
    {
        let f = fees[i];
        total += parseInt(f.ammount);
    }
    return total;
}

async function monthlyPayee()
{
    const salaries = await Salary.find();
    let vat = 0

    for (let i = 0; i < salaries.length; i++) {
        const s = salaries[i];
        vat += parseInt(s.taxed);
    }

    return vat;

}

async function getBalances()
{
    const feesDetails = await Fees.find();
    const outstandingBalances = [];
    let balanceTotal = 0;
    
    for (let i = 0; i < feesDetails.length; i++) {
        const f = feesDetails[i];
        if(parseInt(f.ammount) <= 300000)
        {
            let student = await Student.findById(f.student);
            switch (student.level) {
                case 'L4DC' || 'L4BIT':
                    outstandingBalances.push({
                        id: student.studentId,
                        firstname : student.firstname,
                        lastname : student.lastname,
                        email : student.email,
                        phone : student.phone,
                        class: student.level,
                        balance: "K "+(650000 - parseInt(f.ammount)).toLocaleString()
                    });
                    balanceTotal += (650000 - parseInt(f.ammount));
                break;

                case "L5BIT":
                    outstandingBalances.push({
                        id: student.studentId,
                        firstname : student.firstname,
                        lastname : student.lastname,
                        email : student.email,
                        phone : student.phone,
                        class: student.level,
                        balance: "K "+(850000 - parseInt(f.ammount)).toLocaleString()
                    });
                    balanceTotal += (850000 - parseInt(f.ammount));
                break;

                case 'L6DC' || 'L6BIT':
                    outstandingBalances.push({
                        id: student.studentId,
                        firstname : student.firstname,
                        lastname : student.lastname,
                        email : student.email,
                        phone : student.phone,
                        class: student.level,
                        balance: "K " + (3000000 - parseInt(f.ammount)).toLocaleString()
                    });
                    balanceTotal += (3000000 - parseInt(f.ammount));
                break;
            
                default:
                    break;
            }
        }
    }

    return [outstandingBalances,balanceTotal];
}

async function makeReports(){

    // Anum Report needs info on Tax, Sales, Fees and Assets bought
    const assets = await Asset.find();
    const fees = await Fees.find();
    const salaries = await Salary.find();

    const assetsTotal = await anumStatistics(assets,'price');
    const feesTotal = await anumStatistics(fees,'ammount');
    const salaryTotal = await anumStatistics(salaries,'gross');

    const report ={
        assets : assetsTotal,
        fees : feesTotal,
        salary : salaryTotal
    };

    const data = JSON.stringify(report)
    fs.writeFile('public/reports/dashboard.json',data, err=>{
        if(err)
        {
            console.log(err)
        }
        else{console.log('success saved report')}
    })


}

async function anumStatistics(arr,field)
{
    const yearArr = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (let i = 0; i < arr.length; i++) {
        const a = arr[i];
        for (let counter = 0; counter < 12; counter++) {
            if(moment(a.created_on).month() === counter)
            {
                yearArr[counter] += parseInt(a[field]);   
            }
        }
    }
    return yearArr;
}