const atividades = require('../models/atividades')

module.exports = (app)=>{
    app.post('/atividades', async(req,res)=>{
        //recuperando as informações digiadas
        var dados = req.body
        //exibindo no terminal 
        console.log(dados)
        const conexao = require('../config/database')()
        //model atividades
        const atividades = require('../models/atividades')
        //salvar as informações do formulário no database
        var salvar = await new atividades({
            data:dados.data,
            disciplina:dados.disciplina,
            tipo:dados.tipo,
            entrega:dados.entrega,
            instrucoes:dados.orientacao,
            usuario:dados.id
        }).save()

        //buscar todas as atividades desse ususário 
        var buscar = await atividades.find({usuario:dados.id})
        //console.log(buscar)
        res.render('atividades.ejs',{nome:dados.nome,id:dados.id,dados:buscar})
    })

    //excluir atividades 
    app.get("/excluir",async(req,res)=>{
        //recuperar o parametro id da barra de endereço 
        var id = req.query.id
        var excluir = await atividades.findOneAndRemove({
            _id:id
        })
        //voltar para página atividades 
        //res.render('atividades.ejs',{nome:dados.nome,id:dados.id,dados:buscar})
        res.send("Atividade Excluída!!")
    })
}