const { Kafka } = require('kafkajs')
const fraudDetectorController = require('./controllers/fraudDetectorController')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers:['localhost:9092']
})

const consumer = kafka.consumer({ groupId:'FraudDetectorService' })
// const producer = kafka.producer()

const runApp = async () =>{
    await consumer.connect()
    // await producer.connect()
    await consumer.subscribe({ topic: 'ECOMMERCE_NEW_ORDER' , fromBeginning: true })


    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            let order = JSON.parse(message.value);

            // colocar a função de detecção de fraude
            await fraudDetectorController.verifyOrder(order.nameUser, order.total, order.paymentMethod)
            
        }
    })
}

runApp().catch(console.error)