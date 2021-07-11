import { Router } from "express"

// Importing controllers
import { AuthUserController } from "./controllers/AuthUserController"
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"
import { CreateComplimentController } from "./controllers/CreateComplimentController"
import { ListUserSendedComplimentsController } from "./controllers/ListUserSendedComplimentsController"
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentsController"
import { GenerateTokenToRecoverPasswordController } from "./controllers/GenerateTokenToResetPasswordController"

// Importing the middlewares
import { ensureAuth } from "./middlewares/ensureAuth"
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { ensureUserExists } from "./middlewares/ensureUserExists"
import { ResetPasswordController } from "./controllers/ResetPasswordController"

const router = Router()

// Declaring the controllers
const authUserController = new AuthUserController()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const createComplimentController = new CreateComplimentController()
const listSendedCompliments = new ListUserSendedComplimentsController()
const listReceivedCompliments = new ListUserReceivedComplimentsController()
const generateTokenToRecoverPasswordController = new GenerateTokenToRecoverPasswordController()
const resetPasswordController = new ResetPasswordController()

router.post("/users", createUserController.handle)
router.post("/auth", authUserController.handle)
router.patch("/auth/resetpassword", ensureUserExists, generateTokenToRecoverPasswordController.handle)
router.post("/auth/resetpassword", ensureUserExists, resetPasswordController.handle)
router.post("/tags", ensureAuth, ensureAdmin, createTagController.handle)
router.post("/compliments", ensureAuth, createComplimentController.handle)
router.get("/mySendedCompliments", ensureAuth, listSendedCompliments.handle)
router.get("/myReceivedCompliments", ensureAuth, listReceivedCompliments.handle)

export { router }
