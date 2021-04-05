# Remove Background API
> Serverless: Lambda + API Gateway + S3

Simple serverless api leveraging the [remove.bg API](https://www.remove.bg) to save the output to S3 and share a pre-signed url.

From

![with-bg](./docs/with-bg.jpeg)

To

![with-bg](./docs/no-bg.jpg)

## Usage

### Deployment

This example is made to work with the Serverless Framework

#### Pre-requisites

SLS must be pre-installed.

Equally `aws-cli` must be installed and configured with an AWS account

#### Deployment process

* Edit the serverless.yml with the correct region and profile
* Create a `.env file and populate it with the below info from the [remove.bg API](https://www.remove.bg) docs
```
// .env
REMOVE_BG_KEY=
REMOVE_BG_API_PATH=https://api.remove.bg/v1.0/removebg
```

* Run the following command

```bash
serverless deploy
```



### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl --request POST \
  --url {url} \
  --header 'Content-Type: application/json' \
  --data '{
    "image_url": "https://www.remove.bg/example.jpg",
    "image_size": "auto",
    "image_filename": "example.jpg"
  }
'
```

Which should result in response similar to the following:

```json
{
  "message": "Processed image file succesfully uploaded",
  "url": "{signed-url}"
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function remove-bg --path payloads/example.json
```

### Testing

Use the sample payload with API client software like [Insomnia](https://insomnia.rest/products/insomnia) or [Postman](https://www.postman.com/product/api-client/) or [Postwoman](https://post.liubing.me) to test the deployed function.

## Acknowledgements

* UMAN Fullstack Bootcamp Team 2 (Temi, Oli, Ross, Temi, Luke) - for the idea and finding the remove-gb api
* [serverless-stack](https://serverless-stack.com/#guide)
* [serverless framework / examples](https://github.com/serverless/examples)
* Stack Overflow 😊
* [remove.bg api](https://www.remove.bg)