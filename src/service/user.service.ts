import { Provide } from '@midwayjs/core';
import { BaseService } from '../common/baseService';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { pageSortDTO } from '../dto/common.dto';
import { getHash, hashCheck } from '../utils/_bcrypt';
import * as _ from 'lodash';

@Provide()
export class UserService extends BaseService {
    @InjectEntityModel(UserEntity)
    model: Repository<UserEntity>;

    // 获取所有
    async getAll(condition = {}) {
        return await this.findByCondition({
            where: condition,
            order: { id: 'ASC' },
        });
    }

    // 获取列表
    async getList(pageSort: pageSortDTO, condition: any = {}) {
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
            data: entities,
        };
    }

    async getEntity(id: number) {
        return await this.findOneByCondition({
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
    }

    // 创建用户, 验证账号重复, hash 密码
    async createEntity(form) {
        // 检查用户名重复
        const checkUniqUserName = await this.findByCondition({
            where: {
                username: form.username,
            },
        });
        if (!_.isEmpty(checkUniqUserName)) {
            throw new Error('Existed User');
        }

        const password = await getHash(form.password);
        const user = await this.singleCreate({
            username: form.username,
            password: password,
        });
        if (_.isEmpty(user)) {
            throw new Error('register error');
        }
        return user;
    }

    // 校验密码
    async checkPassword(form) {
        const { username, password } = form;
        const user = await this.model.findOne({
            where: { username: username },
        });
        if (_.isEmpty(user)) {
            throw new Error('username or password error');
        }
        const flag = await hashCheck(password, user.password);
        if (!flag) {
            // TODO 需要全局异常捕获，并相应给前端
            throw new Error('username or password error');
        }
        return user;
    }

    // 删除
    async deleteEntity(id: number) {
        const res = await this.model.delete({ id: id });

        const affected = res.affected;
        if (affected === 0) {
            throw new Error('delete error');
        }
    }
}
