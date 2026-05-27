export class SendPushDto {
    expoPushToken: string
  
    message: {
      title: string
      body: string
      data?: any
    }
  }

  export class CreateUserDto {
    email: string
    pin: string
    expoPushToken?: string
  }