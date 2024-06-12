import { Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/socketio';
import { Config } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class SocketIOJwtMiddleware {
    @Inject()
    jwtService: JwtService;

    @Config('jwt')
    jwt;

    resolve() {
        return async (ctx: Context, next: NextFunction) => {
            console.log('websocket enter SocketIOJwtMiddleware  ---->  ');
            const _token = ctx.handshake.query?.token.toString();
            // console.log('_token  ---->  ', _token);

            const parts = _token.trim().split(' ');
            if (parts.length !== 2) {
                //
                ctx.disconnect(true);
            }
            const [scheme, token] = parts;
            let decodedPayload = {};
            if (!/^Bearer$/i.test(scheme)) {
                ctx.disconnect(true);
            }
            try {
                // jwt.verify方法验证token是否有效
                const decoded = await this.jwtService.verify(
                    token,
                    this.jwt?.secret,
                    {
                        complete: true,
                    }
                );
                decodedPayload = decoded['payload'] || {};
                // console.log(decodedPayload);
                ctx['userId'] = decodedPayload['userId'];
                ctx['isSuper'] = decodedPayload['isSuper'];
            } catch (err) {
                //
                ctx.disconnect(true);
            }
            return await next();
        };
    }

    // 指定中间件的名字，方便排查
    public static getName(): string {
        return 'jwtSocketIO';
    }
}
