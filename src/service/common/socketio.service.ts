/**
 * @author sizhong
 * @date 2024-01-11
 */
/**
 * @author sizhong
 * @date 2024-01-08
 */
import {
    Provide,
    Scope,
    ScopeEnum,
    Init,
    Autoload,
    Config,
} from '@midwayjs/decorator';
import { App } from '@midwayjs/core';
import { Application as SocketApplication } from '@midwayjs/socketio';

@Autoload()
@Provide()
@Scope(ScopeEnum.Singleton) // Singleton 单例，全局唯一（进程级别）
export class SocketIOService {
    @Config('socketio')
    socketio;

    @App('socketIO')
    socketApp: SocketApplication;

    @Init()
    async connect() {
        //
    }

    async send(namespace: string, event: string, data: any) {
        //
        this.socketApp.of(namespace).emit(event, data);
    }

    async sendToUE(event: string, data: any) {
        //
        await this.send('UE', event, data);
    }

    async sendToWeb(event: string, data: any) {
        //
        await this.send('WEB', event, data);
    }
}
