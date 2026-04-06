import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UserService
    ) {}

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, position: user.position, name: user.name };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email);

        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        
        return null;
    }

    async register(body: any) {
        const existingUser = await this.usersService.findOneByEmail(body.email); 
        if (existingUser) {
            throw new UnauthorizedException('Email sudah terdaftar');
        }
        const newUser = await this.usersService.create({ 
            email: body.email, password: body.password, name: body.name
        });
        return newUser;
    }

    async logout() {
        // Implementasi logout bisa dilakukan dengan menghapus token dari client atau menggunakan blacklist token di server
    }

    async getProfile(userId: number) {
        return this.usersService.findOne(userId);
    }
}
