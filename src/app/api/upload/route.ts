import uniqid from 'uniqid';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


export async function POST(req: any) {

  const data = await req.formData();

  if (!data.get('file')) {
    return Response.json(false, { status: 400 })
  }

  const file = data.get('file');

  const s3Client = new S3Client({
    region: 'sa-east-1',
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY as string
    }
  });

  const extensaoArquivo = file.name.split('.').slice(-1)[0] as string;
  const newFileName = `${uniqid()}-pizzaapp.${extensaoArquivo}`;

  const chunks = [];
  for await (const chunk of file.stream()) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  const bucket = 'leonardo-pizzaapp';

  await s3Client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: newFileName,
    ACL: 'public-read',
    ContentType: file.type,
    Body: buffer,
  }))

  const link = `https://${bucket}.s3.amazonaws.com/${newFileName}`

  return Response.json(link, { status: 201 });
}