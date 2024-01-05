import { Config, Provide } from '@midwayjs/core';
import { UserService } from './user.service';
import { Inject } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class SysService {
    @Config('jwt')
    jwt;

    @Inject()
    jwtService: JwtService;

    @Inject()
    userService: UserService;

    async register(form) {
        await this.userService.createUser(form);
    }

    async login(form) {
        // 基本认证
        const user = await this.userService.checkPassword(form);

        // 生成jwt
        const token = await this.jwtService.sign(
            { userId: user.id, username: user.username, isSuper: user.isSuper },
            this.jwt?.secret,
            { expiresIn: this.jwt?.expiresIn }
        );

        return { token: token };
    }
}
