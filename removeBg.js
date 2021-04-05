"use strict";
const axios = require("axios");
const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const S3 = new AWS.S3({
  signatureVersion: "v4",
});
const OUTCOME_MSG = "Processed image file succesfully uploaded";

module.exports.handler = async (event) => {
  const eventBodyParsed = JSON.parse(event.body);
  const { image_url, image_size, image_filename } = eventBodyParsed;
  console.log("image_url", image_url);
  console.log("image_size", image_size);
  console.log("image_filename", image_filename);
  const apiReqOptions = {
    method: "post",
    url: process.env.REMOVE_BG_API_PATH,
    data: {
      image_url: image_url,
      size: image_size,
    },
    responseType: "arraybuffer",
    responseEncoding: "binary",
    headers: {
      "X-Api-Key": process.env.REMOVE_BG_KEY,
    },
  };
  try {
    const { data } = await axios(apiReqOptions);
    const putObjectParams = {
      ACL: "public-read",
      Bucket: process.env.BUCKET,
      Key: image_filename,
      Body: data,
    };
    const getSignedUrlParams = {
      Bucket: process.env.BUCKET,
      Key: image_filename,
      Expires: 30,
    };
    const uploaded = await S3.putObject(putObjectParams).promise();
    if (!uploaded) {
      throw Error("Could not upload file " + image_filename);
    }
    const url = await S3.getSignedUrl("getObject", getSignedUrlParams);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: OUTCOME_MSG,
        url,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
