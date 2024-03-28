/**
 * 自定义异常
 * @author huang
 * @date 2023-06-16
 */

import { MidwayHttpError } from '@midwayjs/core';
import { responseStatusCode } from '../constant/sysStatusCode';

export class UsernameOrPasswordException extends MidwayHttpError {
    constructor() {
        super(
            responseStatusCode.UsernameOrPasswordError.msg,
            responseStatusCode.UsernameOrPasswordError.code
        );
    }
}

export class UserNotExistException extends MidwayHttpError {
    constructor() {
        super(
            responseStatusCode.UserNotExistsError.msg,
            responseStatusCode.UserNotExistsError.code
        );
    }
}
