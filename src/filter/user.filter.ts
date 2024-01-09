/**
 * @author sizhong
 * @date 2024-01-09
 */
import { Catch } from '@midwayjs/decorator';
import {
    UsernameOrPasswordException,
    UserNotExistException,
} from './customException';
import { MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch(UsernameOrPasswordException)
export class UsernameOrPasswordExceptionHandler {
    async catch(err: MidwayHttpError, ctx: Context) {
        console.log('error raised ! ====> ', {
            code: err.code,
            msg: err.message,
        });
        return { code: err.code, msg: err.message, data: null };
    }
}

@Catch(UserNotExistException)
export class UserNotExistExceptionHandler {
    async catch(err: MidwayHttpError, ctx: Context) {
        console.log('error raised ! ====> ', {
            code: err.code,
            msg: err.message,
        });
        return { code: err.code, msg: err.message, data: null };
    }
}
