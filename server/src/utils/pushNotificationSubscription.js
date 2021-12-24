const express = require("express");
const webpush = require("web-push");

const app = express();

const publicVapidKey = process.env.SERVICE_WORKER_PUBLIC_KEY;
const privateVapidKey = process.env.SERVICE_WORKER_PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
const subscribe = (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;
  console.log(subscribption)
  // TODO: store subscription in database (an user can have multiple subscribption endpoint)
  // Send 201 - resource created
  res.status(201).json({});
  // Create payload
  const payload = JSON.stringify({ title: "I came from server !" });
  // Pass object into sendNotification
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
}

module.exports = {subscribe, webpush};