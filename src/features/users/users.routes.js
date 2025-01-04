import express from "express"
import UserController from "./users.controller.js"

const userRouter = express.Router()

const userController = new UserController()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: "user@example.com"
 *         password: "password123"
 */

/**
 * @swagger
 * /users/sign-in:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Token
 *       401:
 *         description: Invalid credentials
 */

userRouter.post("/sign-in",(req,res)=>{
    userController.signIn(req,res)
})

/**
 * @swagger
 * /users/sign-up:
 *   post:
 *     summary: Sign up a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/sign-up'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 * components:
 *   schemas:
 *     sign-up:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The full name of the user
 *           example: John Doe
 *         username:
 *           type: string
 *           description: The unique username for the user
 *           example: johndoe
 *         password:
 *           type: string
 *           description: The password for the user
 *           example: Password@123
 */


userRouter.post("/sign-up",(req,res)=>{
    userController.signUp(req,res)
})

export default userRouter