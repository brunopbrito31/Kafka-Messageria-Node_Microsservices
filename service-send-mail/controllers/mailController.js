exports.sendMail = async ( destinatary, subject, message, credentials ) => {

    console.log('Dados do envio do email: ')
    console.log(`Destinatário = ${destinatary}`)
    console.log(`Assunto = ${subject}`)
    console.log(`Mensagem = ${message}`)
    console.log('-------------------------------')
    console.log(`Credenciais utilizadas no envio, LOGIN = ${credentials.mail}, SENHA = ${credentials.password}`)

    console.log('Simulando o envio do email')
    setTimeout(() => {
        console.log('Simulação finalizada')
        return 0;
    }, 60000)

}
