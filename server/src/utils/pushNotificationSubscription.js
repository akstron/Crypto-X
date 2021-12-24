const express = require("express");
const webpush = require("web-push");
const subscribeMap = require('../store/subscriptionMap');

const app = express();

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
const subscribe = async (req, res) => {

  // Get pushSubscription object
  const subscription = req.body;
  // TODO: stroe subscription in database (an user can have multiple subscribption endpoint)
  // Send 201 - resource created
  res.status(201).json({});

  const userId = req.user.id;

  if(!subscribeMap.has(userId)){
    subscribeMap.set(userId, new Set());
  }
  subscribeMap.get(userId).add(subscription);
}

module.exports = {subscribe, webpush};