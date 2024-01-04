import { Provide } from '@midwayjs/core';

@Provide()
export class XxxService {
    async logic(msg) {
        console.log('msg  ---->  ', msg);
    }
}
