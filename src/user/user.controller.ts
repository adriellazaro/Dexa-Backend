import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile')
  findOne(@Req() req) {
    return this.userService.findOne(req.user.userId);
  }

  @Put('profile')
  updateProfile(@Req() req, @Body() body: any) {
    // console.log('Updating profile for user ID:', req.user.userId);
    return this.userService.updateProfile(req.user.userId, body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.userService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(Number(id));
  }
}