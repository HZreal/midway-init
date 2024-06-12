import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';
import { tmpdir } from 'os';
import * as path from 'path';

export default {
    // use for cookie sign key, should change to your own and keep security
    keys: '1680592368107_8795',

    //
    koa: {
        port: 7001,
    },

    // 根目录
    baseDir: path.resolve('./'),

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

    // upload
    upload: {
        // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
        mode: 'stream',
        // fileSize: string, 最大上传文件大小，默认为 10mb
        fileSize: '500mb',
        // whitelist: string[]，文件扩展名白名单
        // whitelist: uploadWhiteList.filter(ext => ext !== '.zip'),
        whitelist: ['.zip'],
        // tmpdir: string，上传的文件临时存储路径
        tmpdir: join(tmpdir(), 'midway-upload-files'),
        // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
        // cleanTimeout: 5 * 60 * 1000,
        // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
        base64: false,
        // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
        // match: /\/api\/upload/,
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

            // cron
            cronLogger: {
                fileLogName: 'midway-cron.log',
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
                entities: ['**/model/entity/*.entity{.ts,.js}'],
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

    // rabbitmq
    rabbitmq: {
        // 'amqp://账户:密码@IP:端口号/转移后的vhost'
        // 原 vhost: /dev . 这个转义后: %2Fdev
        url: 'amqp://zeng:123456@192.168.1.7:5672/%2Fhuang',
    },

    // 分布式任务
    bull: {
        // 默认的队列配置
        defaultQueueOptions: {
            redis: 'redis://192.168.1.7:6379',
            // 有账号密码
            // redis: {
            //     port: 6379,
            //     host: '127.0.0.1',
            //     password: 'foobared',
            // },
        },
    },

    // mqtt
    mqtt: {
        host: '192.168.1.7',
        port: 1883,
        clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
        clean: true,
        connectTimeout: 4000,
        username: 'giszone',
        password: '0qJ7LauxxRKmFQad',
        reconnectPeriod: 1000,
    },
} as MidwayConfig;
