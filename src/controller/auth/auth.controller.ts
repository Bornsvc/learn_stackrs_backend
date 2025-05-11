import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "src/service/auth/auth.service";

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const { email, password } = body;
    
        const user = await this.authService.validateUser(email, password);
    
        if (user) {
          return { message: 'Login successful', user };
        } else {
          return { message: 'Login failed' };
        }
      }
}