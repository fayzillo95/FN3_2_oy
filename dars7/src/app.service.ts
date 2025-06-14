import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return   `
      <h1> 🚀 Application is running on: http://localhost:3000 </h1>
    `;
  }
}
