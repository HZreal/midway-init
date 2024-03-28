/**
 * User Entity
 * @author huang
 * @date 2023-05-26
 */

import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { ApiProperty } from '@midwayjs/swagger';
import { BaseEntity } from '../../common/baseModel';

@Entity('tb_user', { schema: 'public' })
export class UserEntity extends BaseEntity {
    // 用户名
    @ApiProperty({ description: '用户名' })
    @Column({
        name: 'username',
        type: 'varchar',
        length: 32,
        nullable: false,
        comment: '用户名',
    })
    username: string;

    // 密码
    @Column({
        name: 'password',
        type: 'varchar',
        length: 64,
        nullable: false,
        comment: '密码',
        // select: false, // 查询时不会返回此字段
    })
    password: string;

    // 邮箱
    @ApiProperty({ description: '邮箱' })
    @Column({
        name: 'email',
        type: 'varchar',
        length: 64,
        nullable: true,
        comment: '邮箱',
    })
    email: string;

    // @Column({
    //     type: 'enum',
    //     enum: UserGenderEnum,
    //     default: UserGenderEnum.Female,
    // })
    // gender: UserGenderEnum;

    // 状态
    @ApiProperty({ description: '状态' })
    @Column({
        name: 'status',
        type: 'boolean',
        default: true,
        enum: [true, false],
        comment: '状态',
    })
    status: boolean;

    // 是否是超级管理员
    @Column({
        name: 'is_super',
        type: 'boolean',
        default: false,
        enum: [true, false],
        comment: '是否是超级管理员',
    })
    isSuper: boolean;
}
