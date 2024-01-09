/*
 * 捕获自定义异常
 * */
import { httpError, MidwayHttpError } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';
import { Context } from '@midwayjs/koa';
import { Catch } from '@midwayjs/decorator';
import { failed } from '../common/response';
import { UsernameOrPasswordException } from './customException';

// 400
@Catch(httpError.BadRequestError)
export class BadRequestErrorHandler {
    async catch(err: MidwayHttpError, ctx: Context) {
        console.log('400 error raised ! ====> ', {
            code: err.code,
            msg: err.message,
        });
        return failed(9400, 'Bad Request Error');
    }
}

// 401
@Catch(httpError.UnauthorizedError)
export class UnauthorizedErrorHandler {
    async catch(err: MidwayHttpError, ctx: Context) {
        console.log('401 error raised ! ====> ', {
            code: err.code,
            msg: err.message,
        });
        return failed(9401, 'Unauthorized Error');
    }
}

// 403
@Catch(httpError.ForbiddenError)
export class ForbiddenErrorHandler {
    async catch(err: MidwayHttpError, ctx: Context) {
        console.log('403 error raised ! ====> ', {
            code: err.code,
            msg: err.message,
        });
        return failed(9403, 'Forbidden Error');
    }
}

// 404
@Catch(httpError.NotFoundError)
export class NotFoundErrorHandler {
    async catch(err: MidwayHttpError, ctx: Context) {
        console.log('404 error raised ! ====> ', {
            code: err.code,
            msg: err.message,
        });
        return failed(9404, 'Not Found Error');
    }
}

// 422 参数校验错误
@Catch(MidwayValidationError)
export class ValidationErrorErrorHandler {
    async catch(err: MidwayHttpError, ctx: Context) {
        console.log('422 error raised ! ====> ', {
            code: err.code,
            msg: err.message,
        });
        return failed(9422, err.message);
    }
}

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
