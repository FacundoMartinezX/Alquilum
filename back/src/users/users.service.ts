import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class UsersService {

    constructor(private readonly userRepository: UserRepository) {

    }

    getUsersService() {
        return this.userRepository.getUsersRepository()
    }

    getUserByIdService(userId: string) {
        
        return this.userRepository.getUserByIdRepository(userId)
    }

    createUserService(user: SignUpDto) {
        return this.userRepository.createUserRepository(user)

    }

    updateUserService(userId: string, user:SignUpDto) {

        return this.userRepository.updateUserRepository(userId, user)


    }

    deleteUserService(userId: string) {
        return this.userRepository.deleteUserRepository(userId)

    }
}
