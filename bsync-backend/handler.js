'use strict';
const AWS = require('aws-sdk');
const git = require('isomorphic-git');
const fs = require('fs');

git.plugins.set('fs', fs);
const s3 = new AWS.S3();

async function download_bookmarks(key) {
    let params = {
        Bucket: "bsync-backend",
        Key: key+"/bookmarks.json"
    };
    let content = s3.getObject(params, (err, data) => {
        return err ? {Body: "ERROR"} : data;
    });
    await new Promise((resolve, reject) => fs.writeFile(
        'bookmarks.json',
        content.response.data.Body.toString('utf-8'),
        (err) => err ? reject(err) : resolve()
    ));
    await git.add({dir: '', filepath: 'bookmarks.json'});
    return await git.commit({
        dir: '',
        author: {
            name: 'AWS Lambda',
            email: 'example@example.com'
        },
        message: 'Initial commit'
    });
}

async function initialize(key) {
    await git.init({dir: '' })
    await download_bookmarks(key)
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
