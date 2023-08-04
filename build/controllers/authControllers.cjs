"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = exports.loginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_entity_cjs_1 = require("../mongoose/user.entity.cjs");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginController = async (req, res) => {
    if (!req.body?.email || !req.body?.password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    const user = req.body;
    const email = user.email;
    const password = user.password;
    //check if user exists
    //if not, return error
    const existingUser = await user_entity_cjs_1.User.findOne({ email: email });
    if (!existingUser) {
        res.status(401).json({ message: "User with email not found" });
        return;
    }
    console.log("Password: ", password);
    console.log("HashedPassword:", existingUser.password);
    //check if password matches
    //if not, return error
    const passwordMatches = await bcrypt_1.default.compare(password, existingUser.password);
    if (!passwordMatches) {
        res.status(401).json({ message: "Password is incorrect" });
        return;
    }
    const tokenizedUser = {
        email: existingUser.email,
        id: existingUser._id.toString(),
    };
    const token = createToken(tokenizedUser);
    res.json({ token: token });
};
exports.loginController = loginController;
const signupController = async (req, res) => {
    if (!req.body?.email || !req.body?.password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    const user = req.body;
    const email = user.email;
    const password = user.password;
    //check if email is already registered
    //if yes, return error
    const existingUser = await user_entity_cjs_1.User.findOne({ email: email });
    if (existingUser) {
        res.status(401).json({ message: "User with email already exists" });
        return;
    }
    //hash password
    console.log("Password: ", password);
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    console.log("Hashedpassword: ", hashedPassword);
    //create user
    const newUser = await user_entity_cjs_1.User.create({
        email: email,
        password: hashedPassword,
    });
    const token = createToken({
        email: newUser.email,
        id: newUser._id.toString(),
    });
    res.json({ message: "User created", token: token });
};
exports.signupController = signupController;
const createToken = (user) => {
    const token = jsonwebtoken_1.default.sign(user, 'your-secret-key', { expiresIn: '3h' }); // the token expires in 1 hour
    return token;
};
//# sourceMappingURL=authControllers.cjs.map