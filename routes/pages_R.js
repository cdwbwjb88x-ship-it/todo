const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',(req,res)=>{res.sendFile(path.join(__dirname,"..","public","pages","index.html"))})
router.get('/reg',(req,res)=>{res.sendFile(path.join(__dirname,"..","public","pages","reg.html"))})
router.get('/login',(req,res)=>{res.sendFile(path.join(__dirname,"..","public","pages","login.html"))})
router.get('/u', (req, res) => {res.sendFile(path.join(__dirname, "..", "public", "pages", "users.html"));});
router.get('/c', (req, res) => {res.sendFile(path.join(__dirname, "..", "public", "pages", "categories.html"));});
module.exports = router;