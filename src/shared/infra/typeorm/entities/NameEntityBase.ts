import { Column } from 'typeorm';

import { EntityBase } from './postgres/EntityBase';

abstract class KeyValueBase extends EntityBase {
  @Column()
  name: string;
}
export { KeyValueBase };
