const { Queue } = require("bullmq");
const queue = new Queue("nudgeQueue", { connection: { host: 'localhost', port: 6379 } });
module.exports = queue;
