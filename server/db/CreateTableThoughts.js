
// import main AWS software development kit module and reference it
const AWS = require('aws-sdk');

// config object for AWS that dynamo DB will use to connect to local instance
AWS.config.update({
    region: "us-east-2"
});

// create the dynamo db service object
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// this object holds the schema and metadata of the dynamodb table

const params = {
    TableName: "Thoughts",
    KeySchema: [
        { AttributeName: "username", KeyType: "HASH" },   // partition key
        { AttributeName: "createdAt", KeyType: "RANGE" }  // sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "createdAt", AttributeType: "N" }
        
    ],
    ProvisionedThroughput : {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
}

dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table.  Error JSON:", JSON.stringify(err, null, 2));
     } else {
         console.log('Created table.  Table description JSON: ', JSON.stringify(data, null, 2));
     }
});

