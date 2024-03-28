import { Provide } from '@midwayjs/core';
import { BaseService } from '../common/baseService';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../model/entity/user.entity';
import { PageSortDTO } from '../model/dto/common.dto';
import { getHash, hashCheck } from '../utils/_bcrypt';
import * as _ from 'lodash';
import { userUpdatePasswordDTO } from '../model/dto/user.dto';
import {
    UsernameOrPasswordException,
    UserNotExistException,
} from '../filter/customException';

@Provide()
export class UserService extends BaseService {
    @InjectEntityModel(UserEntity)
    model: Repository<UserEntity>;

    /**
     * 获取所有
     * @param condition
     */
    async getAll(condition = {}) {
        return await this.findByCondition({
            where: condition,
            order: { id: 'ASC' },
        });
    }

    /**
     * 获取列表
     * @param pageSort
     * @param condition
     */
    async getList(pageSort: PageSortDTO, condition: any = {}) {
        const extra = {
            pagination: { page: pageSort.page, pageSize: pageSort.pageSize },
            order: await this.parseSortParams(pageSort.sort),
        };
        const [entities, total] = await this.findAndCountByConditionWithExtra(
            condition,
            extra
        );
        return {
            page: pageSort.page,
            pageSize: pageSort.pageSize,
            totalPage: _.ceil(total / pageSort.pageSize),
            total: total,
            data: _.map(entities, item => _.omit(item, ['password'])),
        };
    }

    /**
     * 获取单个实体
     * @param id
     */
    async getEntity(id: number) {
        const user = await this.findOneByCondition({
            where: { id: id },
            select: {
                id: true,
                username: true,
                email: true,
                createTime: true,
                isSuper: true,
                status: true,
            },
        });
        return _.omit(user, ['password']);
    }

    /**
     * 创建用户, 验证账号重复, hash 密码
     * @param obj
     */
    async createEntity(obj) {
        // 检查用户名重复
        const checkUniqUserName = await this.findOneByCondition({
            where: {
                username: obj.username,
            },
        });
        if (!_.isEmpty(checkUniqUserName)) {
            throw new Error('Existed User');
        }

        const password = await getHash(obj.password);
        const user = await this.singleCreate({
            username: obj.username,
            password: password,
        });
        if (_.isEmpty(user)) {
            throw new Error('create user error');
        }
        return _.omit(user, ['password']);
    }

    /**
     *
     * @param obj
     */
    async updatePassword(obj: userUpdatePasswordDTO) {
        const user = await this.findOneById(obj.id);
        // 没有找到用户
        if (_.isEmpty(user)) {
            this.ctx.logger.error('User update password, user not found');
            throw new UserNotExistException();
        }
        // 校验密码
        if (!(await hashCheck(obj.password, user.password))) {
            // 密码错误
            throw new UsernameOrPasswordException();
        }

        return await this.update({
            id: user.id,
            password: await getHash(obj.newPassword),
        });
    }

    /**
     *
     * @param form
     */
    async checkPassword(form) {
        const { username, password } = form;
        const user = await this.model.findOne({
            where: { username: username },
        });
        if (_.isEmpty(user)) {
            throw new UserNotExistException();
        }
        const flag = await hashCheck(password, user.password);
        if (!flag) {
            throw new UsernameOrPasswordException();
        }
        return user;
    }

    /**
     *
     * @param id
     */
    async resetPassword(id: number) {
        await this.update({
            id: id,
            password: await getHash('123456'),
        });
    }

    /**
     *
     * @param id
     */
    async delete(id: number) {
        // 软删除
        await this.softRemoveById(id);

        // 硬删除
        // await this.deleteEntity(id);
    }

    /**
     *
     * @param id
     */
    async deleteEntity(id: number) {
        const res = await this.model.delete({ id: id });

        const affected = res.affected;
        if (affected === 0) {
            throw new Error('deleteEntity error');
        }
    }
}
