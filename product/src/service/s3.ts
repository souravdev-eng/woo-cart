import { S3 } from 'aws-sdk';
import { Request } from 'express';
import { v4 } from 'uuid';

const bucketName = process.env.AWS_BUCKET_NAME!;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
const region = process.env.AWS_REGION!;

const s3 = new S3({ region, accessKeyId, secretAccessKey });

//uploads file to s3
export const uploadFile = async (file: any, req: Request) => {
  const fileType = file?.mimetype?.split('/')[1];
  const fileName = `${req?.currentUser!.id}/${v4()}-${Date.now()}.${fileType}`;

  const uploadParams = {
    Bucket: bucketName!,
    Body: file?.buffer,
    Key: fileName,
    ContentType: fileType,
    ContentEncoding: 'base64',
    ContentDisposition: 'inline',
  };

  return s3.upload(uploadParams).promise();
};
