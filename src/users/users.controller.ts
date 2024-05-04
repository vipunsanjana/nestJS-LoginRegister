import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { Response,Request } from "express";
import { stat } from "fs";
import { JwtAuthGuard } from "src/authentication/auth.guard";


@Controller('users')
export class UserController{

    constructor(private readonly userService: UserService){}



    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Req() request : Request, @Res() response : Response):Promise<any> {
        try {
            const users = await this.userService.getAllUsers();
            return response.status(200).json({
                status: "success",
                message: "Users retrieved successfully",
                result: users
            });
        } catch (error) {
            return response.status(500).json({ 
                status: "error",
                message: "Internal server error"
            });
        }
    }

}