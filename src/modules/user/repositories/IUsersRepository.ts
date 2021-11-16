import IBaseRepository from '@shared/infra/typeorm/repositories/postgres/IBaseRepository';

import { Users } from '../infra/typeorm/entities/Users';

interface IUsersRepository extends IBaseRepository<Users> {}
export { IUsersRepository };
