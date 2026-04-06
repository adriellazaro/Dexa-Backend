import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'ADRIEL!';
  }

  getAdriel(): string {
    return 'Adriel is the best!';
  }
}
