import { Body, Controller, Post } from '@nestjs/common'
import { PushService } from '../../services/push/push.service'
import { SendPushDto } from '../../config/send-push.dto'

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  // @Post()
  // async sendPush(@Body() body: SendPushDto) {
  //   return this.pushService.sendPushNotification(body)
  // }
}