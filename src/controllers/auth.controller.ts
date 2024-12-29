import { Request, Response } from "express";

export const signup = (_req: Request, res: Response) => {
  res.send("signup route");
};

export const login = (_req: Request, res: Response) => {
  res.send("login route");
};

export const logout = (_req: Request, res: Response) => {
  res.send("logout route");
};

