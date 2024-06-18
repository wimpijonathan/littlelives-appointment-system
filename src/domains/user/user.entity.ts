import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryColumn({ default: () => "concat('user-', gen_random_uuid())" })
    id: string;

    @Column()
    name: string;

    @CreateDateColumn({
        type: 'timestamp',
        precision: 3,
        default: () => `timezone('utc', now())`
    })
    created: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        precision: 3,
        default: () => `timezone('utc', now())`
    })
    updated: Date;
}
