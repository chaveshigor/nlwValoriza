import { Router } from "express"

// Importing controllers
import { AuthUserController } from "./controllers/AuthUserController"
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"
import { CreateComplimentController } from "./controllers/CreateComplimentController"

// Importing the middlewares
import { ensureAdmin } from "./middlewares/ensureAdmin"

const router = Router()

// Declaring the controllers
const authUserController = new AuthUserController()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const createComplimentController = new CreateComplimentController()

router.post("/users", createUserController.handle)
router.post("/auth", authUserController.handle)
router.post("/tags", ensureAdmin, createTagController.handle)
router.post("/compliments", createComplimentController.handle)

export { router }
