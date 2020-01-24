const fs = require('./fs-promise')


//promisses + async/await

/*
readFile('temporizador.js')
    .then(data => writeFile('copia-promise.js', data))
    .then(() => console.log('Arquivo copiado'))
    .catch(err => console.log(err))
*/

//async/await
const copyFile = async() => {
    console.log('ola Async await')
    try {
        const data = await fs.readFile('temporizador.js')
        await fs.writeFile('copy-async-await.js', data)
            //console.log(String(data))
        console.log('arquivo lido')
    } catch (err) {
        console.log('Erro: ', err)
    }
}
copyFile().then(() => console.log('Fim do async/await'))