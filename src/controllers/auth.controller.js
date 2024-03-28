const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createUser(req, res, next) {
  const { name, username, email, password, user_type, dob } = req.body;
  try {
    // Check if user exists already
    const existinguser = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (existinguser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please log in instead.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
        user_type: user_type,
        dob: dob,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser, // Return the created user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `An error occurred while creating a user: ${error.message}`,
    });
  }
}

async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    // Check if user exists already
    const user = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist. Please create an account.",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect or invalid credentials",
      });
    }

    const tokenPayload = {
      username: user.username,
      user_type: user.user_type,
      id: user.id,
    };

    const access_token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    return res.json({
      success: true,
      message: "User logged in successfully",
      status: 200,
      access_token: access_token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `An error occurred while logging in: ${error.message}`,
    });
  }
}

module.exports = {
  createUser,
  login,
};
