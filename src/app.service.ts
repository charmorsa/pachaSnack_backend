import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Pacha API OK';
  }

  getHealth() {
    return {
      status: 'ok',
      service: 'pacha-api',
      timestamp: new Date().toISOString(),
    };
  }
}
