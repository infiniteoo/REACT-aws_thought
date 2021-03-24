// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

// Import the uuid package to create a unique S3 bucket name
const { v4: uuidv4 } = require("uuid");

// Set the region
AWS.config.update({ region: "us-east-2" });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Create the parameters for calling createBucket
var bucketParams = {
  Bucket: "user-images-" + uuidv4(),
};

s3.createBucket(bucketParams, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success");
    console.log('data', data);
  }
});
