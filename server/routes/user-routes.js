const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

// configure service interface object 
const awsConfig = {
    region: 'us-east-2'
    
};

AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = 'Thoughts';

router.get('users', (req, res) => {
    const params = {
        TableName: table
    };
    // scan return all items in the table
    dynamodb.scan(params, (err, data) => {
        if (err) {
            res.status(500).json(err); 
        } else {
            res.json(data.Items);
        }
    })
});

router.get('users/:username', (req, res) => {
    console.log(`Querying for thought(s) from ${req.params.username}.`);

    const params = {
        TableName: table,
        KeyConditionExpression: "#un = :user",
        ExpressionAttributeNames: {
            "#un": "username",
            "#ca": "createdAt",
            "#th": "thought",

        },
        ExpressionAttributeValues: {
            ":user": req.params.username
        },
        ProjectionExpression: "#th, #ca",
        ScanIndexForward: false
    }

    dynamodb.query(params, (err, data) => {
        if (err) {
            console.error('unable to query.  error:', JSON.stringify(err,null,2));
            res.status(500).json(err);
        } else {
            console.log('query succeeded.');
            res.json(data.Items);
        }
    });
});

router.post('/users', (req, res) => {
    const params = {
        TableName = table,
        Item: {
            "username": req.body.username,
            "createdAt": Date.now(),
            "thought": req.body.thought
        }
    };
    // database call
    dynamodb.put(params, (err, data) => {
        if (err) {
            console.error('unable to add item.  error json:', JSON.stringify(err,null,2));
            res.status(500).json(err); 
        } else {
            console.log('Added item:', JSON.stringify(data, null, 2));
            res.json({"Added": JSON.stringify(data,null,2)});
        }
    })
})

module.exports = router;
