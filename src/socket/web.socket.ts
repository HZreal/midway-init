/**
 * @author huang
 * @date 2024-04-08
 * @File: hello.socket.ts
 * @Description:
 */

import {
    WSController,
    OnWSConnection,
    Inject,
    OnWSMessage,
    WSEmit,
} from '@midwayjs/core';
import { Context } from '@midwayjs/socketio';
import { SocketIOJwtMiddleware } from '../middleware/jwt.socketio.middleware';
import { wsEvent } from '../constant/wsEvent.const';

@WSController('/web')
export class WEBSocketIOController {
    @Inject()
    ctx: Context;

    @OnWSConnection({
        middleware: [SocketIOJwtMiddleware],
    })
    async onConnectionMethod() {
        console.log('WEB client connected, id=', this.ctx.id);
    }

    // 接收 UE 端查询某雷达设备的历史监测数据
    @OnWSMessage(wsEvent.WEB.device.alarm.unHappened)
    @WSEmit(wsEvent.WEB.device.alarm.unHappened)
    async test(msg) {
        //
    }
}
