const { post } = require('jquery')
const db = require('./db')

const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }

})

//Post.sync({force: true}) - executar este metodo apens uma vez s enao ele sobescreve as tabela anterior

module.exports = Post

