const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require("../db");

router.post("/join", async (req, res) => {
    let {userId, pwd, userName} = req.body;
    try {
       let hashPwd =  await bcrypt.hash(pwd, 10);
       let sql = "INSERT INTO TBL_USER(USERID, PWD, USERNAME) VALUE (?, ?, ?)";
       let result = await db.query(sql, [userId, hashPwd, userName]);

       res.json({
        result : result,
        msg : "가입되었습니다!"
       });
    } catch (error) {
        console.log(error);
    }
})

router.post("/login", async (req, res) => {
    let {userId, pwd} = req.body;
    try {

       let sql = "SELECT * FROM TBL_USER WHERE USERID = ?";
       let [list] = await db.query(sql, [userId]);
       let msg = "";
       let result = false;
       if(list.length > 0){ 
        let match = await bcrypt.compare(pwd, list[0].pwd);
        if(match){
            msg = list[0].userName + "님 환영합니다!"
            result = true;
        } else {
            msg = "패스워드를 확인해주세요."
        }
       } else {
        msg = "아이디가 존재하지 않습니다."
       }
       res.json({
        result : result,
        msg : msg
       });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;