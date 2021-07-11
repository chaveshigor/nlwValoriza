import { EntityRepository, Repository } from "typeorm"
import { TokenToRecoverPassword } from "../entities/TokenToRecoverPassword"

@EntityRepository(TokenToRecoverPassword)
class TokenToRecoverPasswordRepositories extends Repository<TokenToRecoverPassword>{

}

export { TokenToRecoverPasswordRepositories }
