'use strict';
const AWS = require('aws-sdk');
const git = require('isomorphic-git');
const fs = require('fs');

git.plugins.set('fs', fs);
const s3 = new AWS.S3()

async function download_bookmarks(key) {
    let params = {
        Bucket: "bsync-backend",
        Key: key+"/bookmarks.json"
    };
    s3.getObject(params, (err, data) => {
        let res = err ? "ERROR" : data;
        return res
    })
}

async function initialize() {
    await git.init({dir: '' })
}

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
