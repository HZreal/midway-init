/**
 * @author sizhong
 * @date 2023-12-19
 */
import {
    Provide,
    Consumer,
    MSListenerType,
    Inject,
    ILogger,
} from '@midwayjs/core';
import { MqttListener, Context } from '@ernan2/midway-mqtt';

@Provide()
@Consumer(MSListenerType.MQTT)
export class MqttConsumer {
    @Inject()
    logger: ILogger;

    @Inject()
    ctx: Context;

    @MqttListener('test', { qos: 0 })
    async reply(topic: string, payload: Buffer) {
        // producer
        this.ctx.mqttClient.publish(
            'receive/queue',
            JSON.stringify({ msg: 'hello receive' })
        );
    }

    // @MqttListener('receive/queue', { qos: 0 })
    // async receive(topic: string, payload: Buffer) {
    //     // payload.toString() === '{"msg":"hello receive"}'
    // }

    @MqttListener('/szls/position', { qos: 0 })
    async gotData(topic: string, payload: Buffer) {
        console.log('topic ===========================');
        console.log(topic);
        console.log('=========================== topic');
        console.log('payload ===========================');
        console.log(payload.toString());
        console.log('=========================== payload');
    }

    // @MqttListener('hello/+/post', { qos: 0 })
    // async gotWildcardData(topic: string, payload: Buffer) {}

    // @MqttListener('$queue/hello/+/post')
    // async gotQueueData(topic: string, payload: Buffer) {}

    // @MqttListener('$share/group/hello/+/post')
    // async gotShareData(topic: string, payload: Buffer) {}
}
