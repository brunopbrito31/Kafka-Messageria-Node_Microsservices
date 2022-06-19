const { Kafka } = require('kafkajs')

exports.generateNewOrder = async (req, res, next) => {

    try{
        if(!req.body) return res.status(400).json({message:'A ordem não foi passada'})
        const newOrder = req.body

        // Order to test - Order Format
        // const newOrder = {
        //     nameUser: 'Bruno2',
        //     total: 15.77,
        //     paymentMethod: 'credit-card'
        // }

        const kafka = new Kafka({
            clientId: 'newOrderServiceJs',
            brokers:[process.env.ADRESS_BROKER]
        })

        const producer = kafka.producer()

        await producer.connect()

        await producer.send({
            topic: 'ECOMMERCE_NEW_ORDER',
            messages: [
                { 
                    key: `cliente-${newOrder.nameUser}`, 
                    value: JSON.stringify(newOrder)
                },
            ]
        })

        console.log('nova ordem gerada')
        res.status(201).json({message:'ok'})
    }catch( error ){
        res.status(500).json({message: 'Houve um erro no servidor'})
    }
}









