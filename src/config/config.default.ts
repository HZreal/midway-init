import { MidwayConfig } from '@midwayjs/core';
import { pgModelDeclareEnum } from '../constant/modelDeclare.const';

export default {
    // use for cookie sign key, should change to your own and keep security
    keys: '1680592368107_8795',
    koa: {
        port: 7001,
    },

    // cors
    cors: {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        // credentials: false,
    },

    // jwt
    jwt: {
        secret: 'qwertyuiop12345678', // fs.readFileSync('xxxxx.key')
        expiresIn: '7 days', // https://github.com/vercel/ms
    },

    // 日志
    midwayLogger: {
        // default: {
        //     // 默认全局配置
        // },
        clients: {
            // coreLogger: {
            //     // 框架、组件
            // },
            // appLogger: {
            //     // 应用
            // },

            // 自定义日志
            httpLogger: {
                fileLogName: 'http.log',
                enableFile: true,
                enableConsole: true,
                format: info => {
                    return `${info.timestamp} ${info.LEVEL} ${info.pid} ${info.labelText}${info.message}`;
                },
                // ...
            },
            mqLogger: {
                fileLogName: 'mq.log',
                // ...
            },
        },
    },

    // orm
    typeorm: {
        dataSource: {
            default: {
                /**
                 * 单数据库实例
                 */
                type: 'postgres',
                host: '192.168.1.7',
                port: 5432,
                username: 'postgres',
                password: 'szkj1234567890',
                database: 'ttest',
                synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
                logging: false,
                // timezone: '+08:00', // 默认UTC
                timezone: 'Z',
                // 配置实体模型
                entities: pgModelDeclareEnum,
            },
        },
    },

    // redis
    redis: {
        // 单客户端配置
        client: {
            port: 6379, // Redis port
            host: '192.168.1.7', // Redis host
            // password: "auth",
            db: 15,
        },

        // Sentinel 配置
        // client: {
        //     sentinels: [
        //         {
        //             // Sentinel instances
        //             port: 26379, // Sentinel port
        //             host: '127.0.0.1', // Sentinel host
        //         },
        //     ],
        //     name: 'mymaster', // Master name
        //     password: 'auth',
        //     db: 0,
        // },

        // Cluster 模式配置，需要配置多个
        // Cluster Redis
        // client: {
        //     cluster: true,
        //     nodes: [
        //         {
        //             host: 'host',
        //             port: 'port',
        //         },
        //         {
        //             host: 'host',
        //             port: 'port',
        //         },
        //     ],
        //     redisOptions: {
        //         family: '',
        //         password: 'xxxx',
        //         db: 'xxx',
        //     },
        // },
    },

    // 分布式任务
    // bull: {
    //     // 默认的队列配置
    //     defaultQueueOptions: {
    //         redis: 'redis://127.0.0.1:6379',
    //         // 有账号密码
    //         // redis: {
    //         //     port: 6379,
    //         //     host: '127.0.0.1',
    //         //     password: 'foobared',
    //         // },
    //     },
    // },
} as MidwayConfig;
