const express = require('express');
const mqtt = require('mqtt');
const WebSocket = require('ws');
const { Client } = require('pg');
const app = express();
const wss = new WebSocket.Server({ port: 3000 });
// MQTT client configuration
const mqttClient = mqtt.connect('mqtt://localhost:1883');

// PostgreSQL client
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'signals',
    password: 'yourpassword',
    port: 5432,
});

client.connect();

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log('Received message:', message);
    });
});

// MQTT subscribe to signal topics
mqttClient.on('connect', () => {
    mqttClient.subscribe('signal/#', (err) => {
        if (err) console.log('MQTT subscription error:', err);
    });
});

mqttClient.on('message', (topic, message) => {
    const data = JSON.parse(message.toString());
    // Broadcast signal data to WebSocket clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
});

// Simulate data updates in database and publish to MQTT
setInterval(() => {
    const signalState = Math.random() > 0.5 ? 'green' : 'red'; // Random state for demo
    mqttClient.publish('signal/1', JSON.stringify({ id: 1, state: signalState }));
}, 1000);

app.listen(4000, () => {
    console.log('Backend running on port 4000');
});