import { Entity } from 'typeorm';

import { EntityBase } from '@shared/infra/typeorm/entities/postgres/EntityBase';
import { TABLE_NAME } from '@shared/infra/typeorm/utils/tableNames';

@Entity(TABLE_NAME)
class Users extends EntityBase {}

export { Users };
