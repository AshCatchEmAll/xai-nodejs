// add a middleware to check if the user is authenticated: and has a valid token
import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import { env } from "process";
const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (env.STAGE === "dev") {
    console.log("Dev user")
    req.token = {
      email: "user4",
      id: "6491c79ea2d6811d4a245653",
    };
    next();
  }

  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      message: "No token provided",
    });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, "your-secret-key");
    req.token = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default isAuthenticated;
