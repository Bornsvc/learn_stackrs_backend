import { Module } from "@nestjs/common";
import { AuthService } from "src/service/auth/auth.service";
import { AuthController } from "src/controller/auth/auth.controller";

@Module({
    providers: [AuthService],
    controllers: [AuthController]
})

export class AuthModule {}