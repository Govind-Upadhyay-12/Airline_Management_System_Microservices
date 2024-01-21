// import ampqlib from "amqplib";



// export const createChannel = async () => {
//   try {
//     const connection = await ampqlib.connect('amqp:127.0.0.1');
//     const channel = await connection.createChannel();
//     await channel.assertExchange(AIRLINE_BOOKING, "direct", false);
//     return channel;
//   } catch (error) {
//     console.error("Error creating channel:", error);
//     throw error;
//   }
// };

// export const subscribingMessage = async (channel, binding_key) => {
//   try {
//     const application = await channel.assertQueue("QUEUE_NAME");
//     channel.bindQueue(application.queue, AIRLINE_BOOKING, binding_key);
//     channel.consume(application.queue, (msg) => {
//       console.log("Received message:");
//       console.log(msg.content.toString());
//       channel.ack(msg);
//     });
//   } catch (error) {
//     console.error("Error subscribing to messages:", error);
//     throw error;
//   }
// };

// export const publishMessage = async (channel, binding_key, message) => {
//   try {
//     await channel.assertQueue(QUEUE)
//     await channel.publish(AIRLINE_BOOKING, binding_key, Buffer.from(message));
//   } catch (error) {
//     console.error("Error publishing message:", error);
//     throw error;
//   }
// };
