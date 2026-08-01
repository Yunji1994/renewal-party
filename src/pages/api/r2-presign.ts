import type { APIRoute } from 'astro';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const prerender = false;

export const GET: APIRoute = async ({ request, env }) => {
  const bucket = env.R2_BUCKET;
  const key = `uploads/${Date.now()}-${crypto.randomUUID()}`;

  if (!bucket) {
    return new Response(JSON.stringify({ error: 'R2 bucket not configured' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  });

  const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: 'image/*' });
  const url = await getSignedUrl(client, command, { expiresIn: 300 });

  return new Response(JSON.stringify({ uploadUrl: url, key }), {
    headers: { 'content-type': 'application/json' },
  });
};
