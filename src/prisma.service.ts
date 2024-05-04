import { INestApplication, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


export class PrismaService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        // Type assertion to help TypeScript understand the type of 'beforeExit'
        this.$on('beforeExit' as never, async () => {
            await app.close();
        });
    }
}
