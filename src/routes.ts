import { Router } from "express"

// Importing controllers
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"
import { AuthUserController } from "./controllers/AuthUserController"

// Importing the middlewares
import { ensureAdmin } from "./middlewares/ensureAdmin"

const router = Router()

// Declaring the controllers
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authUserController = new AuthUserController()

router.post("/users", createUserController.handle)
router.post("/auth", authUserController.handle)
router.post("/tags", ensureAdmin, createTagController.handle)


export { router }
