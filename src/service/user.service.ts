import { Provide } from '@midwayjs/core';
import { BaseService } from '../common/baseService';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../model/user.model';

@Provide()
export class UserService extends BaseService {
    @InjectEntityModel(UserModel)
    model: Repository<UserModel>;

    async getUser() {
        const user = await this.findOneById(1);
        console.log('user  ---->  ', user);
    }
}
