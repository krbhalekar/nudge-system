require('dotenv').config();
const { Worker } = require('bullmq');
const mongoose = require('mongoose');
const Sale = require('../models/Sale');
const { generateNudge } = require('../services/genaiService');

const MONGO_URI = process.env.MONGO_URI;
const connection = { host: 'localhost', port: 6379 };

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const worker = new Worker(
            'nudgeQueue',
            async job => {
                const retailerId = job.data.retailerId;
                const now = new Date();
                const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

                const lastMonthSales = await Sale.aggregate([
                    { $match: { retailerId, date: { $gte: lastMonth, $lt: thisMonth } } },
                    { $group: { _id: null, total: { $sum: "$amount" } } }
                ]);

                const thisMonthSales = await Sale.aggregate([
                    { $match: { retailerId, date: { $gte: thisMonth, $lt: now } } },
                    { $group: { _id: null, total: { $sum: "$amount" } } }
                ]);

                const lastTotal = lastMonthSales[0]?.total || 0;
                const thisTotal = thisMonthSales[0]?.total || 0;
                console.log({ lastTotal, thisTotal });
                if (lastTotal > 0 && thisTotal < 0.7 * lastTotal) {
                    console.log('I am If');
                    const message = await generateNudge(retailerId, lastTotal, thisTotal);
                    console.log(`[NUDGE] ${message}`);
                } else {
                    console.log('I am Else');
                    console.log(`[INFO] No nudge triggered for ${retailerId}`);
                }
            },
            { connection }
        );

        console.log('Worker listening for nudge jobs...');
    } catch (err) {
        console.error('Failed to start worker:', err);
    }
})();
