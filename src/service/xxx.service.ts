/**
 * XxxService
 * @author huang
 * @date 2023-05-26
 */

import { Provide } from '@midwayjs/core';

@Provide()
export class XxxService {
    async logic(msg) {
        console.log('msg  ---->  ', msg);
    }
}
