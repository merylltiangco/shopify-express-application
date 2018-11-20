const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce');
const querystring = require('querystring');
const request = require('request-promise');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'write_products';
const forwardingAddress = 'https://729b96b5.ngrok.io';

app.get('/shopify', (req, res) => {
  const shop = req.query.shop;
  if (shop) {
    const state = nonce();
    const redirectUri = forwardingAddress + '/shopify/callback';
    const installUrl =
      'https://' +
      shop +
      '/admin/oauth/authorize?client_id=' +
      apiKey +
      '&scope=' +
      scopes +
      '&state=' +
      state +
      '&redirect_uri=' +
      redirectUri;

    res.cookie('state', state);
    res.redirect(installUrl);
  } else {
    return res
      .status(400)
      .send(
        'missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request'
      );
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
