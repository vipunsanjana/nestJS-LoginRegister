import { Prisma } from "@prisma/client";

export class Users implements Prisma.UserCreateInput {

    name: string;
    username: string;
    password: string;
    email: string;

}