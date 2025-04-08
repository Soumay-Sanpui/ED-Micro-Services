import { Router } from "express";
import {Request, Response} from "express";
import User from "../models/user.model";
import LOGIN_DATA_DTO from "../DTO/login.dto";

const router = Router();

// AUTH ROUTES

// POST: LOGIN
router.post("/login", (req: Request, res: Response)=> {
   const {email, password} = req.body as LOGIN_DATA_DTO;
   res.status(200).json({data: {email, password}, message: "User Login Successful"});
});

export default router;