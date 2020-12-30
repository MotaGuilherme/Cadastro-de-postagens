const express = require ("express");
const app = express();
const handlebars = require ('express-handlebars');
const bodyParser= require ('body-parser');
const Post = require ('./models/Post').Post;    
;



//config main
    //template engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //body Parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())



    //rotas
    app.get('/', function(req, res){
        findAll({order: [['id', 'DESC']]}).then(function(posts){
            res.render('home', {posts: posts})// as chaves {} servem para acessa variaveis diretamente no front


        })
    })

    app.get('/cad', function(req, res){
        res.render('formulario') //render serve para chamar o arquivo do handlebars
    })

    //chamar o post para receber os dados do formulario
    app.post('/add', function(req, res){
        Post.create ({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo

        }).then(function(){ //then sera chamada se der sucesso e ira redirecionar para outra pag
            res.redirect('/')
        }).catch(function(erro) { // catch sera chamada se der erro
            res.send("houve um erro" +erro)
            
        })
    })


    app.get('/deletar/:id', function(req, res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.send("postagem deletada")
        }).catch(function(erro){
            res.send("postagem nao existe")
        })

    })

    app.listen(3333, function(){
        console.log("rodando na porta 3333")
    });