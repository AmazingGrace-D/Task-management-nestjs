import { AuthCredentialsDto } from "./dtos/auth-credentials.dto";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save()
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('User already exists')
            } else {
                throw new InternalServerErrorException;
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}