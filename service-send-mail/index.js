require('dotenv').config()
const { Kafka } = require('kafkajs')
const mailController = require('./controllers/mailController');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers:['localhost:9092']
})

const credentialsMailer = {
    password: process.env.MailerPass,
    mail: process.env.MailerUser
}

const consumer = kafka.consumer({ groupId:'MessageReceptorService' })
const producer = kafka.producer()

// Ouvindo
const runApp = async () =>{
    await consumer.connect()
    await producer.connect()
    await consumer.subscribe({ topic: 'ECOMMERCE_NEW_ORDER' , fromBeginning: true })


    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            let order = JSON.parse(message.value);

            await mailController.sendMail(
                order.nameUser,
                `Compra realizada, cliente ${order.nameUser}` , 
                'esse email está sendo enviado como teste' , 
                credentialsMailer
            );
            
            await producer.send({
                topic: 'ECOMMERCE_NEW_MAIL_SENT',
                messages: [
                    { 
                        key: `cliente-${order.nameUser}`, 
                        value: JSON.stringify(order)
                    },
                ]
            })
            console.log(`Enviando email para o cliente = ${order.nameUser}`)
        }
    })
}

runApp().catch(console.error)