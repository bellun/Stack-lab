const express = require('express')
const app = express()

const sqlite = require('sqlite')
const dbConnection = sqlite.open('banco.sqlite', { Promise })

//
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', async(request, response) => {
    const db = await dbConnection
    const categoriasDb = await db.all('SELECT  * FROM categorias;')
    const vagas = await db.all('SELECT * FROM vagas')
    const categorias = categoriasDb.map(cat => {
        return {
            ...cat,
            vagas: vagas.filter(vaga => vaga.categoria === cat.id)
        }
    })

    response.render('home', {
        categorias
    })

})

app.get('/vaga/:id', async(request, response) => {
    console.log(request.params)
    const db = await dbConnection
    const vaga = await db.get('SELECT * FROM vagas where id= ' + request.params.id)
    console.log(vaga)
    response.render('vaga', {
        vaga
    })
})

app.get('/admin', (request) => {
    response.render('admin/home')
})

app.get('admin/vagas', (req, res) => {
    res.render('admin/home')
})

app.get('/admin/vagas', async(req, res) => {
    db = await dbConnection
    const vagas = await db.all('SELECT * FROM vagas;')
    res.render('admin/vagas', { vagas })
})
app.get('/admin/vagas/delete/:id', async(req, res) => {
    const db = await dbConnection
    await db.run('DELETE FROM vagas WHERE id= ' + req.params.id + 'limit 1')
    res.redirect('/admin/vagas')
})

const init = async() => {
    const db = await dbConnection
    await db.run('CREATE TABLE if not exists categorias (id INTEGER PRIMARY KEY, categoria TEXT);')
    await db.run('CREATE TABLE if not exists vagas (id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT,  descricao TEXT);')
    const categoria = 'Social Media (San Francisco)'
    const descricao = 'Vaga para redes sociais  para divulgar o stacklab'
    await db.run(`INSERT INTO vagas (categoria,titulo,descricao) values(1,'${categoria}', '${descricao}')`)
}
init()

app.listen(3000, (err) => {
    if (err) {
        console.log('Não foi possível iniciar o servidor do Jobfy')
    } else {
        console.log('Servidor do Jobfy rodando.')
    }
})