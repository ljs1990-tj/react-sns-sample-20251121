const express = require('express')
const cors = require('cors') 

const userRouter = require("./routes/user");
const feedRouter = require("./routes/feed");
const app = express()
app.use(cors({
    origin : "*",
    credentials : true
}))
app.use(express.json());

// router 영역

app.use("/user", userRouter);
app.use("/feed", feedRouter);


app.listen(3010, ()=>{
    console.log("server start!");
})