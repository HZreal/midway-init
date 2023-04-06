import { Controller, Get, Query, ALL, Inject, Logger } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { pageSortDTO } from '../dto/pageSort.dto';
import { ILogger } from '@midwayjs/logger';

@Controller('/demo')
export class DemoController {
    @Inject()
    ctx;

    @Inject()
    logger: ILogger;

    // 应用级别的日志记录
    @Logger()
    appLogger: ILogger;

    @Logger('httpLogger')
    httpLogger: ILogger;

    @Get('/validate')
    @Validate()
    async validate(@Query(ALL) query: pageSortDTO) {
        console.log('query;  ---->  ', query);
        return 'for test ';
    }

    @Get('/logger')
    @Validate()
    async log() {
        // 两者等价
        this.logger.info('');
        this.ctx.logger.info('');

        // 应用级别的日志记录
        this.appLogger.info('');

        return 'for logger test ';
    }
}
