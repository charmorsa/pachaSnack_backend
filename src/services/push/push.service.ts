import { Injectable } from '@nestjs/common'

@Injectable()
export class PushService {
  async sendPushNotification(
    expoPushToken: string,
    title: string,
    body: string,
    data?: any,
  ) {
    try {
      if (!expoPushToken) return

      await fetch(
        'https://exp.host/--/api/v2/push/send',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: expoPushToken,
            title,
            body,
            data,
          }),
        },
      )
    } catch (error) {
      console.error('Error push:', error)
    }
  }
}