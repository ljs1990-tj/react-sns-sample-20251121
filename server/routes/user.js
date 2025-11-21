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


module.exports = router;