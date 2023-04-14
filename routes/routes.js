const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')
const {requireAuth, currentUser} = require('../middleware/authMiddleware')

router.get("*",currentUser)
router.post("*",currentUser)

router.get('/',controller.dashboard);
router.post('/',controller.dashboardPost);

// Staff Routes
router.get('/staff',controller.allStaff)
router.post('/staff/new',controller.newStaff)
router.get('/staff/new',(req,res)=>{res.render('staff/new')})
// Staff Routes

// Student Routes
router.get('/students',controller.allStudents)
router.post('/students/new',controller.newStudent)
router.get('/students/new',(req,res)=>{res.render('students/new')})
// Student Routes

// Asset Routes
router.get('/assets',controller.allAssets)
router.post('/assets',controller.saveAsset)
router.get('/assets/new',(req,res)=>{res.render('assets/new')})
// Asset Routes

// Fund Routes
router.get('/funds',controller.allFunds)
router.post('/funds',controller.saveFund)
router.get('/funds/expenditures',(req,res)=>{res.render('funds/expenditures')})
router.get('/funds/earnings',(req,res)=>{res.render('funds/earnings')})
// Fund Routes

// Expenditure Routes
router.post('/expenditure/salary',controller.salaryExpenditure)
router.post('/expenditure/asset',controller.allFunds)
router.post('/expenditure/maintenance',controller.allFunds)
// Expenditure Routes

// Earnings Routes
router.post('/earnings/fees',controller.newFees)
// Earnings Routes

// Budget Routes
router.get('/budgets',controller.allBudgets)
router.post('/budgets/new',controller.addBudget);
router.get('/budgets/new',(req,res)=>{res.render('budgets/new')})
router.get('/budgets/:id',controller.singleBudget)
// Budget Routes

// Reports Routes
router.get('/reports',controller.allReports)
router.get('/reports/:id',controller.singleReport)
// Reports Routes


module.exports = router;