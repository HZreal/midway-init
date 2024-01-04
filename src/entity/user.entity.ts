/**
 * @author sizhong
 * @date 2023-05-26
 */
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('tb_user', { schema: 'public' })
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id?: number;

    @Column('character varying', { name: 'name', nullable: true, length: 32 })
    name: string | null;

    @Column('text', { name: 'desc', nullable: true })
    desc: string | null;
}
