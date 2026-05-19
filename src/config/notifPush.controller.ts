// import fetch from "node-fetch"
// import { Request,Response } from "express"

// export const sendPushNotification = async (req:Request, res:Response) => {
//     try {
//         let expoPushToken:string = req.body.expoPushToken
//         let message:{ title: any; body: any; data: any } = req.body.message

//         // const response = await fetch("https://exp.host/--/api/v2/push/send", {
//         await fetch("https://exp.host/--/api/v2/push/send", {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON. stringify({
//                 to: expoPushToken,
//                 title: message.title,
//                 body: message.body,
//                 data: message. data
//             })
//         })
//         // const result = response.text()
//         // return result
//         return res.status(200).json({state:true, message:'push ok'})
//     } catch (error) {
//         console.log('Error en la consulta push', error)
//         return false
//     }
// }

// export async function sendPush(token:string, data) {
//     try {
//         let expoPushToken:string = token
//         let message = {
//             title:data?.title,
//             body:data?.body,
//             data:data?.data
//         }

//         const response = await fetch("https://exp.host/--/api/v2/push/send", {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON. stringify({
//                 to: expoPushToken,
//                 title: message.title,
//                 body: message.body,
//                 data: message. data
//             })
//         })
//         const result = await response.text()
//         return result
//     } catch (error) {
//         console.log('Error en la consulta push', error)
//         return false
//     }
// }
