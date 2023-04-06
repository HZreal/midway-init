import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@midwayjs/swagger';

/*
模型基类
 */
export class BaseEntity {
    @ApiProperty({ description: 'id' })
    @PrimaryGeneratedColumn()
    id: number;

    // 创建时间
    @CreateDateColumn({
        name: 'create_time',
    })
    createTime: Date;

    // 删除时间
    @DeleteDateColumn({
        name: 'delete_time',
        select: false,
    })
    deleteTime: Date;

    // 是否逻辑删除
    @Column({
        name: 'is_delete',
        default: false,
        select: false,
    })
    isDelete: boolean;
}
