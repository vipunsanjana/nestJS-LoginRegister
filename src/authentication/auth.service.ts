import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login-user.dto";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/users/users.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from "./dto/register-user.dto";
import { Users } from "src/users/users.model";

@Injectable()
export class AuthService{

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UserService,
    ) {}

    async login(loginDto: LoginDto): Promise<any> {
        const {username, password} = loginDto;

        const user = await this.prismaService.user.findUnique({
            where: {username}
        });

        if(!user){
             throw new NotFoundException('User not found'); 
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if(!validatePassword){
            throw new NotFoundException('Invalid credentials'); 
       }

       return {
        token: this.jwtService.sign({username}),
       }

    }


    async register(createDto: RegisterUserDto): Promise<any>{


        const createUsers = new Users();
        createUsers.username = createDto.username;
        createUsers.password = await bcrypt.hash(createDto.password,10);  
        createUsers.email = createDto.email;
        createUsers.name = createDto.name;

        const user = await this.usersService.createUser(createUsers);

        return {
            token: this.jwtService.sign({username: user.username}),
        }

    }

}