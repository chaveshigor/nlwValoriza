import { Router } from "express"

// Importing controllers
import { AuthUserController } from "./controllers/AuthUserController"
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"
import { CreateComplimentController } from "./controllers/CreateComplimentController"
import { ListUserSendedComplimentsController } from "./controllers/ListUserSendedComplimentsController"
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentsController"

// Importing the middlewares
import { ensureAuth } from "./middlewares/ensureAuth"
import { ensureAdmin } from "./middlewares/ensureAdmin"

const router = Router()

// Declaring the controllers
const authUserController = new AuthUserController()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const createComplimentController = new CreateComplimentController()
const listSendedCompliments = new ListUserSendedComplimentsController()
const listReceivedCompliments = new ListUserReceivedComplimentsController()

router.post("/users", createUserController.handle)
router.post("/auth", authUserController.handle)
router.post("/tags", ensureAuth, ensureAdmin, createTagController.handle)
router.post("/compliments", ensureAuth, createComplimentController.handle)
router.get("/mySendedCompliments", ensureAuth, listSendedCompliments.handle)
router.get("/myReceivedCompliments", ensureAuth, listReceivedCompliments.handle)

export { router }
