import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('appointment')
export class AppointmentEntity {
    @PrimaryColumn({ default: () => "concat('app-', gen_random_uuid())" })
    id: string;

    @Column()
    schedule_id: string;

    @Column()
    user_id: string;

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
