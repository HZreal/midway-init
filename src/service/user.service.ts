import { Provide } from '@midwayjs/core';
import { BaseService } from '../common/baseService';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Provide()
export class UserService extends BaseService {
    @InjectEntityModel(UserEntity)
    model: Repository<UserEntity>;

    async getUser() {
        const user = await this.findOneById(1);
        console.log('user  ---->  ', user);
    }
}
