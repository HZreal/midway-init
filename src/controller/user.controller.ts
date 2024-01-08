import {
    Inject,
    Controller,
    Get,
    Query,
    ALL,
    Body,
    Post,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { deleteEntityDTO, pageSortDTO } from '../dto/common.dto';
import { ApiResponse } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';
import { CommonResponse } from '../interface';
import {
    failed,
    successWithData,
    successWithoutData,
} from '../common/response';
import { getHash, hashCheck } from '../utils/_bcrypt';
import * as _ from 'lodash';
import { responseStatusCode } from '../constant/sysStatusCode';
import { userCreateDTO } from '../dto/user.dto';

@Controller('/user')
export class UserController {
    @Inject()
    ctx: Context;

    @Inject()
    userService: UserService;

    // 获取所有
    @Get('/info/all')
    async getAll() {
        const pits = await this.userService.getAll();
        return successWithData(pits);
    }

    // 获取列表
    @Post('/info/list')
    @Validate()
    // @ApiBearerAuth('token')
    async list(@Query(ALL) pageSort: pageSortDTO, @Body(ALL) condition: any) {
        const data = await this.userService.getList(pageSort, condition);
        data.data = _.map(data.data, item => _.omit(item, ['password']));

        return successWithData(data);
    }

    // 创建
    @Post('/info/create')
    @Validate()
    @ApiResponse({})
    async create(@Body(ALL) form: userCreateDTO): Promise<CommonResponse> {
        const user = await this.userService.createEntity(form);

        return successWithData(_.omit(user, ['password']));
    }

    // 获取单个
    @Get('/info/detail')
    @ApiResponse({})
    async detail(@Query('id') id: number): Promise<CommonResponse> {
        const user = await this.userService.getEntity(id);
        return successWithData(_.omit(user, ['password']));
    }

    // 修改
    @Post('/info/update')
    async modifyUserInfo(@Body(ALL) user: any): Promise<any> {
        const result = await this.userService.update(
            _.omit(user, ['username', 'password', 'isSuper'])
        );

        return successWithData(_.omit(result, ['password']));
    }

    // 用户密码修改
    @Post('/info/passwd/change')
    async modifyPassword(
        @Body(ALL) obj: { id: number; oldPassword: string; newPassword: string }
    ): Promise<CommonResponse> {
        const { id, oldPassword, newPassword } = obj;

        // 新老密码一样
        if (_.toString(oldPassword) === _.toString(newPassword)) {
            return failed(
                responseStatusCode.UserPasswordNotChangeError.code,
                responseStatusCode.UserPasswordNotChangeError.msg
            );
        }

        const user = await this.userService.findOneById(id);
        // 没有找到用户
        if (_.isEmpty(user)) {
            return failed(
                responseStatusCode.UserNotExistsError.code,
                responseStatusCode.UserNotExistsError.msg
            );
        }
        // 校验密码
        if (!(await hashCheck(oldPassword, user.password))) {
            // 密码错误
            return failed(
                responseStatusCode.UsernameOrPasswordError.code,
                responseStatusCode.UsernameOrPasswordError.msg
            );
        }

        await this.userService.update({
            id: user.id,
            password: await getHash(newPassword),
        });

        return successWithoutData();
    }

    // 密码重置
    @Post('/info/passwd/reset')
    async resetPasswd(@Body('id') id: number) {
        await this.userService.update({
            id: id,
            password: await getHash('123456'),
        });

        return successWithoutData();
    }

    // 删除
    @Post('/info/delete')
    async deleter(@Body() body: deleteEntityDTO) {
        await this.userService.softRemoveById(body.id);
        return successWithoutData();
    }
}
