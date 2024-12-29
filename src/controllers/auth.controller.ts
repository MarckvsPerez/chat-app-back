import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import { User } from "@/models/user.model";
import { createAccesToken } from "@/utils/jwt";
import { log } from "@/utils/logs";

export const signup = async (req: Request, res: Response) => {
  const { email, fullName, password } = req.body;
  try {


    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
		const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ email, fullName, password: hashPassword });
    
    
    if (!newUser) {
      return res.status(400).json({ message: 'User not created' });
    }
    createAccesToken({ id: newUser.id, email: newUser.email, password: newUser.password }, res);
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', id: newUser.id });
  } catch (error) {
    log("❌ Error creating user", 'error', __dirname);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = (_req: Request, res: Response) => {
  res.send("login route");
};

export const logout = (_req: Request, res: Response) => {
  res.send("logout route");
};

