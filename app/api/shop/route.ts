import { NextApiRequest, NextApiResponse } from 'next';
import Error from 'next/error';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { code, shop } = req.query as { code: string; shop: string };

  const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
  const accessTokenPayload = {
    client_id: process.env.SHOPIFY_CLIENT_ID as string,
    client_secret: process.env.SHOPIFY_CLIENT_ID as string,
    code,
  };

  try {
    const response = await fetch(accessTokenRequestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accessTokenPayload),
    });

    const data = await response.json();

    if (data.access_token) {
      // Here you can store the access token in your database if needed
      // For now, we'll just send it back to the client
      res.status(200).json({accessToken:`${data.access_token}`,shop:`${shop}`});
    } else {
      res.status(500).send('Failed to get access token');
    }
  } catch (error:any) {
    res.status(500).send(error.message);
  }
}
