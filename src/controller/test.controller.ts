import { Controller, Get } from '@midwayjs/core';

@Controller('/test')
export class SysController {
    @Get('/t1')
    async test1(): Promise<string> {
        return 'for test ';
    }
}
