import { Attribute, Entity, Table } from '@typedorm/common';
import { createConnection } from '@typedorm/core';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'reflect-metadata';

const reproTable = new Table({
  name: 'myTable',
  partitionKey: 'PK',
  sortKey: 'SK',
});

@Entity({
  name: 'item',
  primaryKey: {
    partitionKey: 'FOO:{{id}}#BAR:{{id}}',
    sortKey: 'ITEM#DATE#{{uuid}}',
  },
})
class MyEntity {
  @Attribute()
  id!: string;

  @Attribute()
  uuid!: string;

  @Attribute()
  body!: string;

  @Attribute()
  related!: string[];
}

async function main() {
  const conn = createConnection({
    table: reproTable,
    entities: [MyEntity],
    documentClient: new DocumentClient({
      credentials: {
        accessKeyId: 'rcbepf',
        secretAccessKey: 'uytsjf',
      },
      endpoint: 'http://localhost:8000', // or this can be any other endpoint
      region: 'localhost',
    }),
  });

  const entityManager = conn.entityManager;

  const result = await entityManager
    .find(
      MyEntity,
      { id: '123' },
      {
        keyCondition: {
          BEGINS_WITH: 'ITEM#',
        },
      }
    )
    .catch((err) => {
      console.log('main 52 >', err);
    });

  console.log('main 1 >', result);
}
main();
