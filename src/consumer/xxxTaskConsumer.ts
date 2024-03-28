/**
 * 消费者
 * @author huang
 * @date 2023-06-16
 */

import {
    Consumer,
    MSListenerType,
    RabbitMQListener,
    Inject,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/rabbitmq';
import { ConsumeMessage } from 'amqplib';
import { xxxTask } from '../constant/mqTopic';
import { XxxService } from '../service/xxx.service';

@Consumer(MSListenerType.RABBITMQ)
export class XxxTaskConsumer {
    @Inject()
    ctx: Context;

    @Inject()
    xxxService: XxxService;

    @RabbitMQListener(`${xxxTask.enum.task.queue}`, {
        exchange: xxxTask.exchange.name,
        exchangeOptions: {
            type: xxxTask.exchange.model,
            durable: true,
        },
        routingKey: xxxTask.enum.task.route,
        // exclusive: true,
        consumeOptions: {
            noAck: false,
        },
        prefetch: 1, // 每次获取多少个消息, 一般这里设置为 1
    })
    async gotMessage(message: ConsumeMessage) {
        try {
            const mqMsg: any | any[] = JSON.parse(
                message.content.toString('utf8')
            );
            await this.xxxService.logic(mqMsg);
        } catch (err) {
            console.log('err ============================', err);
        } finally {
            this.ctx.channel.ack(message);
        }
    }
}
