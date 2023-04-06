import { MidwayConfig } from '@midwayjs/core';
import { pgModelDeclareEnum } from '../constant/modelDeclare.const';

export default {
    // use for cookie sign key, should change to your own and keep security
    keys: '1680592368107_8795',
    koa: {
        port: 7001,
    },

    // jwt
    jwt: {
        secret: 'qwertyuiop12345678', // fs.readFileSync('xxxxx.key')
        expiresIn: '7 days', // https://github.com/vercel/ms
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
} as MidwayConfig;
