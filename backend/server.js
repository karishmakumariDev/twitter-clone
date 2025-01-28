import express from "express"
import authRautes from "./routes/auth.routes.js"
const app = express();


app.use("/api/auth",authRautes);

app.listen(8000, () => {
    console.log("server is runging on post 8000");
})