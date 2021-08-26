# Reproduction for issue typedorm [#157](https://github.com/typedorm/typedorm/issues/157)

## Setup

- node v14.17.3, npm 7.20.2
- Load InvalidSetRepro.json into NoSQL Workbench
- Use NoSQL Workbench to commit this table to your Local DDB
- `npm i`
- `npx ts-node main.ts`
- You should get InvalidSetType

## Details

Looking at the source of the error, `aws-sdk/lib/dynamodb/set.js:28:10`, we can see initialize is being called for some reason with undefined, which then leads to the failure in `aws-sdk/lib/dynamodb/set.js:37:24` but its not clear (to me) _why_ this is happening.

If I were to remove the set from table, then I get back the records I expect (both in my app, and in this repro) no problem.

```
InvalidSetType: Sets can contain string, number, or binary values
    at Set.detectType (/Users/mamihod/src/typedorm-InvalidSetType-repro/node_modules/aws-sdk/lib/dynamodb/set.js:37:24)
    at Set.initialize (/Users/mamihod/src/typedorm-InvalidSetType-repro/node_modules/aws-sdk/lib/dynamodb/set.js:28:10)
    at new Set (/Users/mamihod/src/typedorm-InvalidSetType-repro/node_modules/aws-sdk/lib/dynamodb/set.js:22:10)
    at TransformOperationExecutor.transform (/Users/mamihod/src/typedorm-InvalidSetType-repro/node_modules/src/TransformOperationExecutor.ts:152:22)
    at TransformOperationExecutor.transform (/Users/mamihod/src/typedorm-InvalidSetType-repro/node_modules/src/TransformOperationExecutor.ts:313:33)
    at ClassTransformer.plainToClassFromExist (/Users/mamihod/src/typedorm-InvalidSetType-repro/node_modules/src/ClassTransformer.ts:100:21)
    at Object.plainToClassFromExist (/Users/mamihod/src/typedorm-InvalidSetType-repro/node_modules/src/index.ts:64:27)
    at EntityTransformer.fromDynamoEntity (/Users/mamihod/packages/core/src/classes/transformer/entity-transformer.ts:77:31)
    at /Users/mamihod/packages/core/src/classes/manager/entity-manager.ts:551:33
    at Array.map (<anonymous>) {
  code: 'InvalidSetType',
  time: 2021-08-26T00:33:23.326Z
```
