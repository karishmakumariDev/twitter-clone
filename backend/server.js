import express from "express"
const app = express();
app.get("/",(req,res) => {
    res.send("server is ready");
})

app.listen(8000, () => {
    console.log("server is runging on post 8000");
})