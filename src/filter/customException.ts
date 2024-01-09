/*
自定义异常
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
