exports.verifyOrder = async (userMail, value, paymentMethod) => {

    let mailIsValid = await isValidMail(userMail)
    let orderSuspect = await isSuspectPayment(value, paymentMethod)

    if(mailIsValid && !orderSuspect){
        setTimeout(()=>{
            console.log('Validação concluída')
            return true;
        },60000)
    }
}


isValidMail = async (mail) => {
    console.log('Validando o email...')
    setTimeout(() => {
        console.log(`Email: ${mail} é um email válido`)
        return true;
    },60000)
}

isSuspectPayment = async ( value, paymentMethod) => {
    console.log('Validando o método e valor de pagamento')
    setTimeout(() => {
        console.log(`Valor e método de pagamento, Valor = ${value} e Método de pagamento = ${paymentMethod}`)
        return false;
    },60000)
}

