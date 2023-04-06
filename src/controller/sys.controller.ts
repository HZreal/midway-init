import { Controller, Get, Post } from '@midwayjs/core';

@Controller('/')
export class IndexController {
    @Get('/')
    async home(): Promise<string> {
        return 'Hello Midway!';
    }
}

@Controller('/sys')
export class SysController {
    @Post('/login')
    async login(): Promise<string> {
        return 'Hello Midwayjs!';
    }
}
