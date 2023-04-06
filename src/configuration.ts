import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as swagger from '@midwayjs/swagger';
import * as jwt from '@midwayjs/jwt';

// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtMiddleware } from './middleware/jwt.middleware';

@Configuration({
    imports: [
        koa,
        validate,
        {
            component: info,
            enabledEnvironment: ['local'],
        },
        {
            component: swagger,
            // enabledEnvironment: ['local'],
        },
        jwt,
    ],
    importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
    @App()
    app: koa.Application;

    async onReady() {
        // 注册中间件
        this.app.useMiddleware([JwtMiddleware, ReportMiddleware]);
        // 把中间件添加到名为 jwt 的中间件之后
        // this.app.getMiddleware().insertAfter(someMiddleware, 'jwt');

        // add filter
        // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
    }
}
