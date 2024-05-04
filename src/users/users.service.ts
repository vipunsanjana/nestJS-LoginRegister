import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Users } from "./users.model";

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}

    async getAllUsers(): Promise<Users[]>{
        return this.prisma.user.findMany();
    }

    async createUser(data: Users): Promise<Users>{
        
        const existing = await this.prisma.user.findUnique({
            where: {
                username: data.username,
            }
        }); 

        if(existing){
            throw new ConflictException('Username already exists');
        }


        return this.prisma.user.create({
            data
        });

    }

}