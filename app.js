require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const salesRoutes = require('./routes/salesRoutes');
const queue = require('./queue');

const app = express();
app.use(express.json());
connectDB();

app.use('/api', salesRoutes);

app.post('/trigger-nudge', async (req, res) => {
  const { retailerId } = req.body;
  await queue.add("generate-nudge", { retailerId });
  res.send("Nudge job queued.");
});

app.listen(process.env.SERVER_PORT, () => console.log(`Server running on port ${process.env.SERVER_PORT}`));
