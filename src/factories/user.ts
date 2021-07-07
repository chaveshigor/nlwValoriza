import { Factory } from "fishery"
import { User } from "../entities/User"

const date = new Date()

const FakeUser = Factory.define<User>(({sequence}) => ({
    id: "808e6722-2a12-4c27-a595-b12df4de1c3e",
    name: "Higor",
    email: "higor@gmail.com",
    password:"123456",
    admin: true,
    created_at: date,
    updated_at: date
}))

export { FakeUser }