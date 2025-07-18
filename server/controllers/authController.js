const bcrypt = require('bcryptjs');
const UserDB = require('../models/usermodel');
const generateToken = require('../utils/generateToken');
require('dotenv').config();

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await UserDB.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "user already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserDB.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        const token = generateToken(user._id, user.role);
        res.status(201).json({ message: "registraion success", token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserDB.findOne({ email });
        if (!user) return res.status(404).json({ message: "user not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "password is incorrect" });

        const token = generateToken(user._id, user.role);
        res.status(201).json({ message: "login successful", token });
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}