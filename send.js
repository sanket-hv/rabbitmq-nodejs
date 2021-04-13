// import the rabbitmq library first
var amqp = require('amqplib/callback_api');

// connet to the rabbitmq server
amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        console.log(error0.message)
        throw error0;
    }
    // creating channer
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        // declaring queue
        var queue = 'hello';
        var msg = 'Hello world';

        // create queue
        channel.assertQueue(queue, {
            durable: false
        });

        // sending messages to the queue
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});

