import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as crossDomain from '@midwayjs/cross-domain';
import * as orm from '@midwayjs/typeorm';
import * as upload from '@midwayjs/upload';
import * as info from '@midwayjs/info';
import * as swagger from '@midwayjs/swagger';
import * as redis from '@midwayjs/redis';
import * as rabbitmq from '@midwayjs/rabbitmq';
import * as bull from '@midwayjs/bull';
import * as cron from '@midwayjs/cron';
import * as jwt from '@midwayjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { ReportMiddleware } from './middleware/report.middleware';
import * as socketio from '@midwayjs/socketio';

import {
    BadRequestErrorHandler,
    DefaultErrorFilter,
    ForbiddenErrorHandler,
    NotFoundErrorHandler,
    UnauthorizedErrorHandler,
    ValidationErrorErrorHandler,
} from './filter/common.filter';
import {
    UsernameOrPasswordExceptionHandler,
    UserNotExistExceptionHandler,
} from './filter/user.filter';
import * as path from 'path';

@Configuration({
    imports: [
        koa,
        validate,
        crossDomain,
        orm,
        upload,

        {
            component: info,
            enabledEnvironment: ['local'],
        },

        {
            component: swagger,
            // enabledEnvironment: ['local'],
        },

        redis,

        rabbitmq,

        jwt,

        // 分布式任务管理系统，必须依赖 redis. doc: https://midwayjs.org/docs/extensions/bull
        bull,

        // cron 组件提供的是本地任务能力，即在每台机器的每个进程都会执行。如需不同机器或者不同进程之间只执行一次任务，请使用 bull 组件.
        // reference: https://midwayjs.org/docs/extensions/cron
        cron,

        //
        socketio,
    ],
    importConfigs: [path.join(__dirname, './config')],
})
export class ContainerLifeCycle {
    @App()
    app: koa.Application;

    async onReady() {
        // 注册中间件
        this.app.useMiddleware(ReportMiddleware);
        this.app.useMiddleware([JwtMiddleware, ReportMiddleware]);
        // 把中间件添加到名为 jwt 的中间件之后
        // this.app.getMiddleware().insertAfter(someMiddleware, 'jwt');

        // add filter
        this.app.useFilter([
            DefaultErrorFilter, // 各种未知未定义错误处理器
            BadRequestErrorHandler,
            UnauthorizedErrorHandler,
            ForbiddenErrorHandler,
            NotFoundErrorHandler,
            ValidationErrorErrorHandler,
            UsernameOrPasswordExceptionHandler,
            UserNotExistExceptionHandler,
        ]);
    }
}
