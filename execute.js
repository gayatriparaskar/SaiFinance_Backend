const Redis = require("ioredis");
const Queue = require("bull");
const dotenv = require("dotenv");
dotenv.config();

const redisConfigTwo = {
  host: process.env.redisTwoHost,
  port: process.env.redisTwoPort,
  username: process.env.redisTwoUserName,
  password: process.env.redisTwoPassword,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
  retryStrategy: (times) => {
    console.warn(`Redis retry attempt ${times}`);
    if (times >= 5) {
      console.error("Redis: Max retry attempts reached. Exiting...");
      process.exit(1);
    }
    return Math.min(times * 200, 5000); // Exponential backoff up to 5 seconds
  },
  reconnectOnError: (err) => {
    console.error("Redis error encountered:", err.message);
    return true; // Attempt to reconnect
  },
};

// conss
const clientTwo = new Redis(redisConfigTwo);
const subscriberTwo = new Redis(redisConfigTwo);

const optsTwo = {
  createClient: function (type, redisOpts) {
    switch (type) {
      case "client":
        return clientTwo;
      case "subscriber":
        return subscriberTwo;
      case "bclient":
        return new Redis(redisConfigTwo, redisOpts);
      default:
        throw new Error("Unexpected connection type: ", type);
    }
  },
};
const stripePaymentsQueueTwo = new Queue(
  `stripe-payments-queue-${process.env.NODE_ENV}`,
  {
    ...optsTwo,
    prefix: process.env.ORDER_PREFIX,
    // settings: {
    //   backoffStrategies: {
    //     binaryExponential: (attemptsMade, err, options = {}) => {
    //       const delay = options.delay || 1000;
    //       const truncate = options.truncate || 10; // Limit exponential growth
    //       console.error({ attemptsMade, err, options });

    //       return Math.round(
    //         Math.random() *
    //           (Math.pow(2, Math.min(attemptsMade, truncate)) - 1) *
    //           delay
    //       );
    //     },
    //   },
    // },
  }
);

stripePaymentsQueueTwo.process(2, async (job) => {
  try {
    console.log("Processing jobId:", job.id);
    console.log("Processing job:", job.data);
    // e;
    // Simulate some processing logic
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Example delay

    // // await new Promise((resolve) => setTimeout(resolve, 60000));
    // await job.remove();
  } catch (error) {
    throw error;
  }
});

stripePaymentsQueueTwo.on("completed", async (job) => {
  console.log(`Processed by worker: ${process.pid}`);
  console.log(`Job completed: ${job.id}`);
  try {
    await job.remove(); // Removes job from Redis
    console.log(`Job ${job.id} removed from Redis.`);
  } catch (err) {
    console.error(`Error removing job ${job.id} from Redis:`, err);
  }
});

stripePaymentsQueueTwo.on("failed", (job, err) => {
  console.log(`Processed by worker: ${process.pid}`);
  console.error(`Job failed: ${job.id}`, err);
});

stripePaymentsQueueTwo.on("error", (err) => {
  console.log(`Processed by worker: ${process.pid}`);
  console.error("Queue error:", err);
});

module.exports = { clientTwo, subscriberTwo };
