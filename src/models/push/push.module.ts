import { Module } from '@nestjs/common'
import { PushService } from '../../services/push/push.service'

@Module({
  providers: [PushService],
  exports: [PushService],
})
export class PushModule {}