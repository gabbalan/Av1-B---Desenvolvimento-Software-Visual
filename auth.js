//auth.jc 
const jwt = require('jsonwebtoken')
const secret = '123'; //Ponto de vunerabilidade porque a chave secreta não acessivel
//Recomenda-se gravar em variaveis de ambiente do sistema operacional

//Metodo para gerar o tokenjwt
async function generateToken(user){
    const id = user.id;
    const email = user.email;
    const token = jwt.sign({id, email},secret, {expiresIn: "1h"});
    return token;

}

//Metodo para verificar a validade do toke jwt
async function verifyToken(req, res, next){
    //Extrair o cabeçalho (header) que contem o token jwt
    const authheader = req.headers['authorization'];
    if (!authheader){
        return res.status(401).json({Message:'Token nao informado'})
    }
    //Extrair o token jwt
    const token = authheader. split (' ')[1];//Esperar pelo espaco para ignorar o bearer 
    if(!token){
        return res.status(401). json({message:'Token não informado'});
    }
    //Verificar a validade
    jwt.verify(token, secret,(err, decoded)=>{
        if (err){
            //caso ocorra erro
            return res.status(401).json({Message: 'Token invalido'});
        }
        req.user = decoded;//Est alinha é opcional
        next();
    });
}

module.exports = {generateToken, verifyToken};
