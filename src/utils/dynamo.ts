import DynamoDB from 'aws-sdk/clients/dynamodb';

export default class DynamoClient {
  table: string;
  docClient: DynamoDB.DocumentClient;

  constructor(table = process.env.USERS_TABLE!) {
    this.docClient = new DynamoDB.DocumentClient();
    this.table = table;
  }

  async findAll() {
    const data = await this.docClient.scan({ TableName: this.table }).promise();
    return data.Items;
  }

  async find(id: string) {
    var params = {
      TableName: this.table,
      Key: { userId: id },
    };
    const data = await this.docClient.get(params).promise();
    return data.Item;
  }

  async store(Item: object) {
    const params = {
      TableName: this.table,
      Item,
    };

    return await this.docClient.put(params).promise();
  }
}
