import { Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { Config, httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { jwtUrlExcludeList } from '../constant/jwt.const';

@Middleware()
export class JwtMiddleware {
    @Inject()
    jwtService: JwtService;

    @Config('jwt')
    jwt;

    resolve() {
        return async (ctx: Context, next: NextFunction) => {
            // 判断下有没有校验信息
            if (!ctx.headers['authorization']) {
                throw new httpError.UnauthorizedError();
            }
            // 从 header 上获取校验信息
            const parts = ctx.get('authorization').trim().split(' ');

            if (parts.length !== 2) {
                throw new httpError.UnauthorizedError();
            }

            const [scheme, token] = parts;

            let decodedPayload = {};
            if (/^Bearer$/i.test(scheme)) {
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
                    // console.log(
                    //     'decoded result ----------',
                    //     decoded,
                    //     typeof decoded
                    // );
                    // {
                    //   header: { alg: 'HS256', typ: 'JWT' },
                    //   payload: { userId: 5, userName: 'huang', isSuper: true, iat: 1663584860, exp: 1663757660 },
                    //   signature: 'yCI6UNNkbiZj5iQgx5s4PSWpny69cRKsk3k5CNVuvaM'
                    // }

                    // TODO 检查权限
                    // if (decoded.payload.isSuper != true) {
                    //     // 不是超级管理员
                    //     // 查用户角色、查权限，获得该用户允许的权限p_code列表
                    //     const userId = decoded.payload.userId
                    //
                    //
                    //
                    // }
                } catch (err) {
                    console.log('JWT check error ---->  ', err.message);
                    // token过期 生成新的token
                    // const newToken = getToken(user);
                    // 将新token放入Authorization中返回给前端
                    // ctx.set("authorization", newToken);
                    throw new httpError.UnauthorizedError();
                }

                // if (decodedPayload['userId'] < 1) {
                //     throw new PermissionException();
                // }

                await next();
            }
        };
    }

    // 指定中间件的名字，方便排查
    public static getName(): string {
        return 'jwt';
    }

    // 配置忽略鉴权的路由地址
    public match(ctx: Context): boolean {
        // const ignore = ctx.path.indexOf("/sys/login") !== -1;
        // return !ignore

        // 忽略 /demo/* 和 /test/* 的路由
        if (ctx.path.includes('/demo') || ctx.path.includes('/test')) {
            return false;
        }

        return !jwtUrlExcludeList.includes(ctx.path);
    }
}
