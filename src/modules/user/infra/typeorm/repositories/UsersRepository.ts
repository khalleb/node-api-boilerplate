import { IUsersRepository } from '@modules/user/repositories';

import BaseRepository from '@shared/infra/typeorm/repositories/postgres/BaseRepository';

import { Users } from '../entities/Users';

class UsersRepository extends BaseRepository<Users> implements IUsersRepository {
  public constructor() {
    super(Users);
  }
}
export { UsersRepository };
