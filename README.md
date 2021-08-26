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
