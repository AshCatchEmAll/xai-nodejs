
import express, { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { User } from "../mongoose/user.entity.cjs";
import bcrypt from "bcrypt";



interface TokenizedUser {
    email: string;
    id: string;
}

const loginController = async (req:Request, res:Response) => {

    
    if(!req.body?.email || !req.body?.password){
        res.status(400).json({message: "Missing required fields"});
        return;
    }

    const user = req.body;

    const email = user.email;
    const password = user.password;
    
    //check if user exists
    //if not, return error
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        res.status(401).json({ message: "User with email not found" });
        return;
    }
    console.log("Password: ", password);
    console.log("HashedPassword:", existingUser.password);
    //check if password matches
    //if not, return error
    const passwordMatches = await bcrypt.compare(   
        password,
        existingUser.password
    );
    if (!passwordMatches) {
        res.status(401).json({ message: "Password is incorrect" });
        return;
    }


    const tokenizedUser:TokenizedUser = {
        email: existingUser.email,
        id: existingUser._id.toString(),
    }
    const token = createToken(tokenizedUser);

    res.json({ token: token });
}



const signupController = async (req:Request, res:Response) => {


    if (!req.body?.email || !req.body?.password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    const user = req.body;

    const email = user.email;
    const password = user.password;

    //check if email is already registered
    //if yes, return error

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        res.status(401).json({ message: "User with email already exists" });
        return;
    }

    //hash password
    console.log("Password: ", password)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashedpassword: ", hashedPassword)
    //create user
    const newUser = await User.create({
        email: email,
        password: hashedPassword,
        
    });


    const token = createToken({
        email: newUser.email,
        id: newUser._id.toString(),
    },)

    res.json({ message: "User created", token : token });

}


const createToken = (user: TokenizedUser) => {
    const token = jwt.sign( user , 'your-secret-key', { expiresIn: '3h' }); // the token expires in 1 hour
    return token;
}
        

export {loginController, signupController};