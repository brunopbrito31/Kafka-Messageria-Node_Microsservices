const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app-log',
    brokers:['localhost:9092']
})

const consumer = kafka.consumer({ groupId:'LogReceptorService' })

const runApp = async () =>{
    await consumer.connect()
    await consumer.subscribe({ topic: 'ECOMMERCE_NEW_MAIL_SENT' , fromBeginning: true })


    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // let order = JSON.parse(message.value);
            console.log(`LOG PERSONALIZADO: Um email foi enviado, dados = ${message.value}}`)
        }
    })
}

runApp().catch(console.error)