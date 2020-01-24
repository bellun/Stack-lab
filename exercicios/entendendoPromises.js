const fs = require('fs')


const readFile = file => new Promise((resolve, reject) => {
        fs.readFile(file, (erro, conteudo) => {
            if (erro) {
                reject(erro)
            } else {
                resolve(conteudo)
            }
        })
    })
    /*
    readFile('./arquivo1.txt').then(conteudo => {
            console.log(null, String(conteudo))
            return readFile('./arquivo2.txt')
        })
        .then(conteudo => {
            console.log(String(conteudo))
        })
    console.log(1)

    console.log(2)

    console.log(3)

    */

const init = async() => {
    try {
        const conteudo = await readFile('./arquivo1.txt')
        const conteudo2 = await readFile('./testeerro.txt')
        console.log(conteudo)
    } catch (error) {
        console.log(error)
    }
}

console.log(init())