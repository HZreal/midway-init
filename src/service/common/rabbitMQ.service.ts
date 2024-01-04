/**
 * @author huang
 * @date 2024-01-04
 */
import {
    Provide,
    Scope,
    ScopeEnum,
    Init,
    Autoload,
    Destroy,
    Config,
} from '@midwayjs/decorator';
import * as amqp from 'amqp-connection-manager';
import { xxxTask } from '../../constant/mqTopic';

@Autoload()
@Provide()
@Scope(ScopeEnum.Singleton) // Singleton 单例，全局唯一（进程级别）
export class RabbitmqService {
    private connection: amqp.AmqpConnectionManager;

    private channel: amqp.ChannelWrapper;

    @Config('rabbitmq')
    rabbitmqConfig;

    @Init()
    async connect() {
        // 创建连接，你可以把配置放在 Config 中，然后注入进来
        this.connection = await amqp.connect(this.rabbitmqConfig?.url);

        // 创建 channel
        this.channel = this.connection.createChannel();

        this.connection.on('close', () => {
            this.connection = null;
        });
        this.connection.on('error', () => {
            this.connection = null;
        });

        this.channel.on('close', () => {
            this.channel = null;
        });
        this.channel.on('error', () => {
            this.channel = null;
        });
    }

    @Destroy()
    async close() {
        await this.channel.close();
        await this.connection.close();
    }

    // 发送消息通用方法
    public async sendToExchange(params: {
        exchangeName: string;
        exchangeModel: string;
        route: string;
        message: object;
    }) {
        const { exchangeName, exchangeModel, route, message } = params;

        // TODO: 校验 message 的 JSON 格式

        // 断线重连
        if (this.connection === null) {
            this.connection = await amqp.connect(this.rabbitmqConfig?.url);
        }
        if (this.channel === null) {
            this.channel = await this.connection.createChannel();
        }

        await this.channel.assertExchange(exchangeName, exchangeModel, {
            durable: true,
        });

        await this.channel.publish(
            exchangeName,
            route,
            Buffer.from(JSON.stringify(message))
        );
    }

    public async sendXXXXXMessage(message: object) {
        await this.sendToExchange({
            exchangeName: xxxTask.exchange.name,
            exchangeModel: xxxTask.exchange.model,
            route: xxxTask.enum.task.route,
            message,
        });
    }
}
