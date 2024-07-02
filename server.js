const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./users/userRoutes');
const discussionRoutes = require('./discussions/discussionRoutes');
const interactionRoutes = require('./interactions/interactionRoutes');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/interactions', interactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
