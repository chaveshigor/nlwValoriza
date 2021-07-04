import { Router } from "express"

// Importing controllers
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"

// Importing the middlewares
import { ensureAdmin } from "./middlewares/ensureAdmin"

const router = Router()

// Declaring the controllers
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()

router.post("/users", createUserController.handle)
router.post("/tags", ensureAdmin, createTagController.handle)

export { router }
