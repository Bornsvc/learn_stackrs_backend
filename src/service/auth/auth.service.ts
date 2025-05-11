import { Injectable } from "@nestjs/common";
import {  JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()

export class AuthService {
    private users = [
        {
            id: 1,
            email: 'born@gmail.com',
            password: '12345678'
        }
    ] 

    async validateUser(email: string, password: string) {
        const user = this.users.find((u) => u.email === email);
        if (!user) {
            return 'Did not find user!';
        } else if(user){
            const isMatch = password === user.password ;
            if (!isMatch) {
                return 'Password is incorrect!';
            }
            return user;
        }
    }
}