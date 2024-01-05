import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

/*
模型基类
 */
export class BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer', comment: '主键id' })
    id: number;

    // 创建时间
    @CreateDateColumn({
        name: 'create_time',
        type: 'timestamp',
        default: () => 'NOW()',
        comment: '创建时间',
    })
    createTime: Date;

    // 更新时间
    @UpdateDateColumn({
        name: 'update_time',
        type: 'timestamp',
        default: () => 'NOW()',
        comment: '更新时间',
    })
    updateTime: Date;

    // 删除时间
    @DeleteDateColumn({
        name: 'delete_time',
        type: 'timestamp',
        default: null,
        comment: '删除时间',
    })
    deleteTime: Date;

    // 是否逻辑删除
    @Column({
        name: 'is_delete',
        type: 'boolean',
        default: false,
        select: false,
    })
    isDelete: boolean;
}
