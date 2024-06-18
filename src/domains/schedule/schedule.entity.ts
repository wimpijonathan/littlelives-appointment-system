import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('schedule')
export class ScheduleEntity {
    @PrimaryColumn({ default: () => "concat('sched-', gen_random_uuid())" })
    id: string;

    @Column()
    date: string;

    @Column()
    time: string;

    @Column()
    available_slot: number;

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
