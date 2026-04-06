import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { UnauthorizedException } from '@nestjs/common';
import { use } from 'passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: any) {
        // const user = { id: 1, email: body.email }; // contoh user, nanti bisa diganti dengan database
        const user = await this.authService.validateUser(body.email, body.password);
    
        if (!user) {
            throw new UnauthorizedException('Email atau password salah');
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() body: any) {
        return this.authService.register(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}
