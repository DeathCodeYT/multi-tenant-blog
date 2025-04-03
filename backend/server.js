import express from "express";
import { connectToDb } from "./src/db/db.js";
import dotenv from "dotenv";
import { globalErrorHandler, PERMISSIONS } from "./src/utils/index.js";
import { authGuard } from "./src/middlewares/index.js";
import cors from 'cors'
import {
  AdminRouter,
  AuthRouter,
  BlogRouter,
  UserRouter,
} from "./src/routes/index.js";
import { Role } from "./src/models/index.js";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
]
const corsOptions = {
  origin:function(origin,callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null,true)
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus:200,
  methods:"GET,HEAD,PUT,PATCH,POST,DELTE",
  credentials:true,
}
dotenv.config({ path: "./.env" });
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true,limit:"2mb" }));
app.use(express.static("public"));
app.use(cookieParser());


app.use(authGuard);

const API_URI = "/api/v1";
app.use(`${API_URI}/auth`, AuthRouter);
app.use(`${API_URI}/admin`, AdminRouter);
app.use(`${API_URI}/user`, UserRouter);
app.use(`${API_URI}/blog`, BlogRouter);

app.use(globalErrorHandler);
const PORT = process.env.PORT || 4000;
(async () => {
  try {
    await connectToDb();
    await init()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Something went wrong");
  }
})();

const init = async () => {
  let userRole = await Role.findOne({ roleValue: "user" });
  if (!userRole) {
    userRole = new Role({
      roleValue: "user",
      roleName: "User",
      roleDescription: "Normal User",
    });
    await userRole.save();
  }
  let adminRole = await Role.findOne({ roleValue: "admin" });
  if (!adminRole) {
    adminRole = new Role({
      roleValue: "admin",
      roleName: "Admin",
      roleDescription: "Admin Role",
    });
    await adminRole.save();
  }
};
