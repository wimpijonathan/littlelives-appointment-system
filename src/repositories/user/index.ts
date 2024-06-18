import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from 'src/domains/user/user.entity';
import { logger } from 'src/libs/logger';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async findOneBy(query: Partial<UserEntity>): Promise<UserEntity> {
        try {
            return await this.findOneOrFail(query);
        } catch (error) {
            logger.error('Error when finding user...', error);
            throw new Error(error);
        }
    }
}
