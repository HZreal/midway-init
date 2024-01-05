import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
    @Inject()
    ctx: Context;

    @Inject()
    userService: UserService;

    @Get('/get_user')
    async getUser(@Query('uid') uid) {
        return { success: true, message: 'OK', data: {} };
    }
}
