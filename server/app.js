import express from "express";
import cors from "cors";

const app =express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}))
app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true, limit:"16kb"}))

app.use(express.static("public"))
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)

export {app}