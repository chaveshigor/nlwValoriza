import { Request, Response } from "express"
import { ListUserSendedComplimentsService } from "../services/ListUserSendedComplimentsService"

class ListUserSendedComplimentsController {
    async handle(req: Request, res: Response) {
        const { user_id } = req

        const listSendedCompliments = new ListUserSendedComplimentsService()
        const compliments = await listSendedCompliments.execute(user_id)

        return res.status(200).json(compliments)
    }
}

export { ListUserSendedComplimentsController }