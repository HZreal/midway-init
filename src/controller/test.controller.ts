/**
 * TestController
 * @author huang
 * @date 2023-06-16
 */

import { Controller, Get } from '@midwayjs/core';

@Controller('/test')
export class TestController {
    @Get('/t1')
    async test1(): Promise<string> {
        return 'for test ';
    }
}
