import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('holiday')
export class HolidayEntity {
    @PrimaryColumn({ default: () => "concat('hol-', gen_random_uuid())" })
    id: string;

    @Column()
    date: string;

    @Column()
    description: string;

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
