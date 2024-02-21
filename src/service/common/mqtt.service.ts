// /**
//  * @author sizhong
//  * @date 2023-12-19
//  */
// import {
//     Autoload,
//     Config,
//     Destroy,
//     Init,
//     Provide,
//     Scope,
//     ScopeEnum,
// } from '@midwayjs/core';
// import * as mqtt from 'mqtt';
// // import { MqttServer as Mqtt, IClientSubscribeOptions, } from '@ernan2/midway-mqtt';
//
// // import { MqttMessageService } from './mqttMessage.service';
//
// @Autoload()
// @Scope(ScopeEnum.Singleton)
// @Provide()
// export class MqttService {
//     @Config('mqtt')
//     mqttConfig;
//
//     // @Inject()
//     // mqttMessageService: MqttMessageService;
//
//     private client: mqtt.MqttClient;
//
//     @Init()
//     async connect() {
//         this.client = mqtt.connect(this.mqttConfig);
//         // const topic = [
//         //     '/szls/video',
//         //     '/szls/position',
//         // ];
//         this.client.on('connect', () => {
//             console.log('MQTT Broker Connected!');
//             // this.client.subscribe(topic, () => {
//             //     console.log(`Subscribe to topic '${topic}'`);
//             // });
//         });
//
//         // 定义一个监听事件，监听来自 MQTT Broker的消息
//         // this.client.on('message', async (topic, payload) => {
//         //     console.log(`Received Message: [${topic}]: ${payload.toString()}`);
//         //     let payloadData = payload.toString();
//         //     console.log('payloadData ===========================');
//         //     console.log(payloadData);
//         //     console.log('=========================== payloadData');
//         //     payloadData = payloadData.replace(/\\"/g, '"');
//         //     console.log('payloadData 2.1 ===========================');
//         //     console.log(payloadData);
//         //     console.log('=========================== payloadData 2.1');
//         //     try {
//         //         payloadData = JSON.parse(payloadData);
//         //     } catch (error) {
//         //         console.log('error ===========================');
//         //         console.log(error);
//         //         console.log('=========================== error');
//         //         // pass
//         //     }
//         //     console.log('payloadData 3 ===========================');
//         //     console.log(payloadData);
//         //     console.log('=========================== payloadData 3');
//         //
//         //     const topicSplit = _.chain(topic).split('/').compact().value();
//         //     console.log('topicSplit  ---->  ', topicSplit);
//
//         //     await this.mqttMessageService.add();
//         // });
//     }
//
//     // 发送消息
//     async publish(
//         topic: string,
//         data: string | Buffer,
//         opts?: mqtt.IClientPublishOptions
//     ) {
//         return this.client.publish(topic, data, opts);
//     }
//
//     @Destroy()
//     async close() {
//         this.client.end();
//     }
// }
