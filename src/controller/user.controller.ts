import {
    ALL,
    Body,
    Controller,
    Get,
    Inject,
    Post,
    Query,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { entityIdDTO, pageSortDTO } from '../dto/common.dto';
import { ApiResponse } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';
import { CommonResponse } from '../interface';
import {
    failed,
    successWithData,
    successWithoutData,
} from '../common/response';
import * as _ from 'lodash';
import { responseStatusCode } from '../constant/sysStatusCode';
import {
    UserCreateDTO,
    UserUpdateBasicInfoDTO,
    userUpdatePasswordDTO,
} from '../dto/user.dto';

@Controller('/user')
export class UserController {
    @Inject()
    ctx: Context;

    @Inject()
    userService: UserService;

    // 获取所有
    @Get('/info/all')
    @Validate()
    @ApiResponse({})
    async getAll(@Body() condition: any) {
        try {
            const entities = await this.userService.getAll(condition);
            return successWithData(entities);
        } catch (err) {
            this.ctx.logger.error(err);
            throw new Error(err);
        }
    }

    // 获取列表
    @Post('/info/list')
    @Validate()
    @ApiResponse({})
    // @ApiBearerAuth('token')
    async list(@Query(ALL) pageSort: pageSortDTO, @Body(ALL) condition: any) {
        try {
            const data = await this.userService.getList(pageSort, condition);
            return successWithData(data);
        } catch (err) {
            this.ctx.logger.error(err);
            throw new Error(err);
        }
    }

    // 创建
    @Post('/info/create')
    @Validate()
    @ApiResponse({})
    async create(@Body(ALL) obj: UserCreateDTO): Promise<CommonResponse> {
        try {
            const user = await this.userService.createEntity(obj);
            return successWithData(user);
        } catch (err) {}
    }

    // 获取单个
    @Get('/info/detail')
    @Validate()
    @ApiResponse({})
    async detail(@Query() body: entityIdDTO): Promise<CommonResponse> {
        try {
            const user = await this.userService.getEntity(body.id);
            return successWithData(user);
        } catch (err) {
            this.ctx.logger.error(err);
            throw new Error(err);
        }
    }

    // 修改基本信息
    @Post('/info/update')
    @Validate()
    @ApiResponse({})
    async updateBasicInfo(
        @Body(ALL) user: UserUpdateBasicInfoDTO
    ): Promise<any> {
        try {
            const result = await this.userService.update(
                _.omit(user, ['password', 'isSuper'])
            );
            return successWithData(_.omit(result, ['password']));
        } catch (err) {
            this.ctx.logger.error(err);
            throw new Error(err);
        }
    }

    // 密码修改
    @Post('/info/passwd/change')
    @Validate()
    @ApiResponse({})
    async updatePassword(
        @Body(ALL) obj: userUpdatePasswordDTO
    ): Promise<CommonResponse> {
        try {
            if (!this.ctx?.isSuper) {
                // TODO
                return failed(99111, 'is Not super admin');
            }
            if (obj.password === obj.newPassword) {
                // 新老密码一样则直接退出
                return failed(
                    responseStatusCode.UserPasswordNotChangeError.code,
                    responseStatusCode.UserPasswordNotChangeError.msg
                );
            }
            await this.userService.updatePassword(obj);
            return successWithoutData();
        } catch (err) {
            this.ctx.logger.error(err);
            throw new Error(err);
        }
    }

    // 密码重置
    @Post('/info/passwd/reset')
    @Validate()
    @ApiResponse({})
    async resetPassword(@Body() body: entityIdDTO) {
        try {
            await this.userService.resetPassword(body.id);
            return successWithoutData();
        } catch (err) {
            this.ctx.logger.error(err);
            throw new Error(err);
        }
    }

    // 删除
    @Post('/info/delete')
    @Validate()
    @ApiResponse({})
    async delete(@Body() body: entityIdDTO) {
        try {
            await this.userService.delete(body.id);
            return successWithoutData();
        } catch (err) {
            this.ctx.logger.error(err);
            throw new Error(err);
        }
    }
}
