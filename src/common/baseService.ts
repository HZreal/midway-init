/**
 * 服务基类
 * @author huang
 * @date 2023-06-16
 */

import * as _ from 'lodash';
import { In, Repository } from 'typeorm';
import { Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

export class BaseService {
    model: Repository<any>;

    @Inject()
    ctx: Context;
    async parseSortParams(sort?: string): Promise<object> {
        if (_.isEmpty(sort)) {
            return {};
        }
        const order = {};
        order[sort.split(':')[0]] = sort.split(':')[1];
        return order;
    }

    async findAll() {
        return this.model.find();
    }

    async findOneById(id: number | string) {
        return this.model.findOne({ where: { id } });
    }

    async findOneByCondition(condition: any) {
        return this.model.findOne(condition);
    }

    async findByCondition(condition: any) {
        return this.model.find(condition);
    }

    async findByIds(ids: number[] | string[]) {
        return this.model.findByIds(ids);
    }

    // 带翻页的搜索，只输出当页内容，没有 count
    async findByConditionWithExtra(
        condition?: any,
        extra?: {
            pagination?: {
                page?: number;
                pageSize?: number;
            };
            order?: object; // {field: 'ASC'}
        }
    ) {
        const filter: any = {
            where: condition || {},
            skip: 0,
            take: 10,
        };

        if (!_.isEmpty(extra)) {
            if (_.has(extra.pagination, 'pageSize')) {
                filter.take = extra.pagination.pageSize;
            }

            if (_.has(extra.pagination, 'page') && extra.pagination.page > 1) {
                filter.skip = (extra.pagination.page - 1) * filter.take;
            }

            if (!_.isEmpty(extra.order)) {
                filter.order = extra.order;
            }
        }

        return this.model.find(filter);
    }

    // 分页排序的查询，输出 list, count
    async findAndCountByConditionWithExtra(
        condition?: any,
        extra?: {
            pagination?: {
                page?: number;
                pageSize?: number;
            };
            order?: object; // {field: 'ASC'}
        }
    ) {
        const filter: any = {
            where: condition || {},
            skip: 0,
            take: 10,
        };

        if (!_.isEmpty(extra)) {
            if (_.has(extra.pagination, 'pageSize')) {
                filter.take = extra.pagination.pageSize;
            }

            if (_.has(extra.pagination, 'page') && extra.pagination.page > 1) {
                filter.skip = (extra.pagination.page - 1) * filter.take;
            }

            if (!_.isEmpty(extra.order)) {
                filter.order = extra.order;
            }
        }

        return await this.model.findAndCount(filter);
    }

    async countByCondition(condition: any) {
        return this.model.count(condition);
    }

    // 单个对象新增
    async singleCreate(object, options?: object): Promise<any> {
        const obj = this.model.create(object);
        return await this.model.save(obj, options);
    }

    // 多个对象新增
    async bulkCreate(objects: any[]) {
        return await this.model.insert(
            objects.map(object => this.model.create(object))
        );
    }

    // 根据 id 更新
    async update(object: any) {
        if (_.isEmpty(object)) {
            return;
        }
        if (!('id' in object)) {
            return;
        }
        if (_.isEmpty(_.omit(object, ['id']))) {
            return;
        }
        const modelObj = await this.model.findOne({
            where: {
                id: object?.id,
            },
        });
        return this.model.save(Object.assign(modelObj, object));
    }

    // 根据条件批量更新属性, 更新的属性值一致
    async updateByCondition(condition: any, updates: any) {
        return this.model
            .createQueryBuilder()
            .update()
            .set(updates)
            .where(condition)
            .execute();
    }

    // 根据 id 删除
    async removeById(id: any) {
        id = _.toInteger(id);
        if (id < 1) {
            return;
        }
        const modelObj = await this.model.findOne({
            where: {
                id,
            },
        });
        if (_.isEmpty(modelObj)) {
            return;
        }
        return this.model.remove(modelObj);
    }

    // 根据 id 软删除
    async softRemoveById(id: any) {
        id = _.toInteger(id);
        if (id < 1) {
            return;
        }
        const modelObj = await this.model.findOne({
            where: {
                id,
            },
        });
        if (_.isEmpty(modelObj)) {
            return;
        }
        return this.model.softRemove(modelObj);
    }

    // 根据 ids 删除
    async removeByIds(ids: any[]) {
        const modelObjList = await this.model.find({
            where: {
                id: In(ids),
            },
        });
        if (_.isEmpty(modelObjList)) {
            return;
        }
        return this.model.remove(modelObjList);
    }
}
