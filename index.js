const express = require('express')
const app = express()

app.use(express.json())

const alunos = [
    {
        id: 1,
        nome: "Arthur Duque",
        email: "arthur@gmail.com"
    },
    {
        id: 2,
        nome: "Pedro Speratti",
        email: "pedro@gmail.com"
    },
    {
        id: 3,
        nome: "Julia Lopes",
        email: "julia@gmail.com"
    },
    {
        id: 6,
        nome: "Heloisa Silveira",
        email: "heloisa@gmail.com"
    } 
    
]

app.get("/", function(req, res) {
    res.send("Hello World, você conseguiu!")

})

app.get("/alunos", function(req, res) {
    const nome = req.query.nome

    // se nao passar query param, retorna todos
    // o ponto de exclamação inverte o valor 
    // se o nome não tiver valor ele é falso por conta do sinal de exclamação ele vira verdadeiro e executa o que esta no if   
    if(!nome){
        return res.json(alunos)
    }
    const alunosFiltrados = alunos.filter(a => a.nome.toLowerCase().includes(nome.toLowerCase())
)

    res.json(alunosFiltrados)
  
})

app.post("/alunos", function(req, res) {
    const nomeQueVeioDoCliente = req.body.nome
    const emailQueVeiodoCliente = req.body.email


    if(!nomeQueVeioDoCliente || !emailQueVeiodoCliente){
        return res.status(400).json({erro: "Nome e e-mail são obrigatórios!"})
}
    const novoAluno = {
        id: 5,
        nome: nomeQueVeioDoCliente,
        email: emailQueVeiodoCliente
    }
    alunos.push(novoAluno)
    res.status(201).send()
})

    
  


app.get("/alunos/:id", function(req, res) {
    const id= parseInt(req.params.id) // o query paraments volta para texto 

    const aluno = alunos.find(a => a.id == id)

    // se a varialvel for nula e igual a falso,
    // se tiver alguma coisa é verdaderio
    if(aluno){
        return res.json(aluno)  
    } else {
        res.status(404).json("Aluno não encontrado")
    }
})

app.put("/alunos/:id", function(req, res){
    const id = parseInt(req.params.id)
    //const nome = req.body.nome 
    //const email = req.body.email

    const {nome, email} = req.body 

    if(!nome || !email){
        return res.status(400).json("nome e email são obrigatorios")
    }

    // Precisa descobrir em qual posição do arry/lista 
    // O aluno está pelo id 

    const indexDoAluno = alunos.findIndex(a => a.id == id)

    if(indexDoAluno === -1){
        return res.status(404).json("Alunos não encontrado")
    }

    alunos[indexDoAluno].email = email
    alunos[indexDoAluno].nome = nome

    return res.json(alunos[indexDoAluno])
})

app.delete("/alunos/:id", function(req,res){
    const id = parseInt(req.params.id)
    const index = alunos.findIndex(a => a.id === id)

    if(index === -1) {
        return res.status(404).json("aluno não encontrado")
    }

    // remove elementos a partir de um index
    // nesse caso ele remove um elemento a partir do index que foi informado 
    // exemplo: frutas = ["maça", "banana", "uva", "abacaxi"]
    // frutas.splice(1, 2) essa função vai retornar o que foi removido no caso de banana e uva
    // no caso banana e ula ele removeu 2 elementos depois do index 1 
    // e a lista de frutas vai fica apenas ["maca", "banana"]
    const alunosRemovido = alunos.splice(index, 1)
    return res.status(204).json("aluno deletado com sucesso!")
})

//-------------------------------------------------------------------------------------------------------------------------
const professores = [
    {
        id: 1,
        nome: "bethania",
        discplina: "Filosofia",
        anoContratacao: 2022
    },
    {
        id: 2,
        nome: "Gabriel",
        discplina: "Ed. fisica",
        anoContratacao: 2023
    }
  
]


app.get("/professores", function (req, res) {
    const anoContratacao = parseInt(req.query.anoContratacao)
 
    // Se não passar query param, retorna todos
    // "!" se algo for falso, realiza a função do if
    if (!anoContratacao) {
        return res.json(professores)
    }
 
    const professoresFiltrados = professores.filter(p => p.anoContratacao === anoContratacao)
 
    res.json(professoresFiltrados)
})
 
app.post("/professores", function (req, res) {
    const nomeQueVeioDoNavegador = req.body.nome
    const disciplinaQueVeioDoNavgeador = req.body.disciplina
    const anoContratacaoQueVeioDoNavgeador = req.body.anoContratacao
 
    if (!nomeQueVeioDoNavegador || !disciplinaQueVeioDoNavgeador || !anoContratacaoQueVeioDoNavgeador) {
        return res.status(400).json({ erro: "nome, ano de contratação ou disciplinba inválido" })
    }
 
    // criando objeto novo com as informações que vieram do cliente
    const novoProfessor = {
        id: 3,
        nome: nomeQueVeioDoNavegador,
        disciplina: disciplinaQueVeioDoNavgeador,
        anoContratacao: anoContratacaoQueVeioDoNavgeador
    }  
    //adiciona o novo aluno no final da lista
    professores.push(novoProfessor)
    res.status(201).send()
})
 
app.delete("/professores/:id", function (req, res) {
    const id = parseInt(req.params.id)
    const index = professores.findIndex(a => a.id === id)
 
    if (index == -1) {
        return res(404).json("professor não encontrado")
    }
    // Remove elementos a partir de um index
    // Nesse caso, ele remove um elemento a partir do index que foi informado
    // Exemplo: frutas = ["Maça", "Banana", "Uva", "Abacaxi"]
    // frutas.splice(1, 2) essa função vai retornar o que foi removido no caso banana e uva
    // Removeu 2 elementos após os index 1
    // E a lista de frutas vai ficar apenas ["Maça", "Banana"]
    const professorRemovido = professores.splice(index, 1)
    return res.status(204).json("Professores deletado com sucesso?")
})
 
app.put("/professores/:id", function (req, res) {
    const id = parseInt(req.params.id)
    //const nome = req.body.nome
    //const email = req.body.email
 
    //desestruturação
    const { nome, disciplina, anoContratacao } = req.body
 
    // exclamação verifica se variavel é nula e vai pro if de verdadeiro ou falso
    if (!nome || !disciplina || !anoContratacao) {
        return res.status(400).json("Nome, disciplina e ano de contratação são obrigatórios")
    }
 
    //precisamos descobrir em qual posição do array/lista
    //o aluno esta pelo id
    const indexDoProfessor = professores.findIndex(a => a.id == id)
 
    if (indexDoProfessor === -1) {
        return res.status(404).json("Aluno não encontrado")
    }
    //substiui os dados do aluno pelo novos da requisição
    professores[indexDoProfessor].nome = nome
    professores[indexDoProfessor].disciplina = disciplina
    professores[indexDoProfessor].anoContratacao = anoContratacao
 
    return res.json(professores[indexDoProfessor])
})
 
app.listen(3000, function () {    //Monitora / Escuta a porta 3000
    console.log("Servidor rodando na porta 3000")
})