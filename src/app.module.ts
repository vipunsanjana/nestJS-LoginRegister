import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';


@Module({
  imports: [UserModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
