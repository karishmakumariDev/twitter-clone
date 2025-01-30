import express from "express"
import authRautes from "./routes/auth.routes.js"
const app = express();

//password = Krp0otqZ0B5sgFal
// mongodb+srv://<db_username>:<db_password>@cluster0.irmdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use("/api/auth",authRautes);

app.listen(8000, () => {
    console.log("server is runging on post 8000");
})