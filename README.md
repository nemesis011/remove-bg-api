# Remove background from image

Simple serverless api leveraging the [removebg API]() to save the output to S3 and share a pre-signed url.

## Usage

### Deployment

This example is made to work with the Serverless Framework

#### Pre-requisites

SLS must be pre-installed.

Equally `aws-cli` must be installed and configured with an AWS account

#### Deployment process

* Edit the serverless.yml with the correct region and profile

```bash
serverless deploy
```

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
POST https://xxxxxxx.execute-api.{region}.amazonaws.com/{stage}/

body: {
  "image_url": "https://www.remove.bg/example.jpg",
	"image_size": "auto",
	"image_filename": "example.jpg"
}
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
{
  {
  "message": "Processed image file succesfully uploaded",
  "url": "{signed-url}"
}
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function remove-bg --path payloads/example.json
```

Alternatively, you can use the sample payload with API client software like [Insomnia](https://insomnia.rest/products/insomnia) or [Postman]() to test the deployed function.
