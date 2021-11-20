var argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const fs = require('fs');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let rawdata = fs.readFileSync(argv.i);
let Classe = JSON.parse(rawdata);

let TotalAlunos = Classe.alunos.length;
let QuantidadeGrupos = TotalAlunos / argv.q;

Group = {}

for (let i = 0; i < QuantidadeGrupos; i++) {
  Group[`grupo_${i + 1}`] = []
}

let grupo_corrente = 1;
while (Classe.alunos.length > 0) {
  if (grupo_corrente > Math.ceil(QuantidadeGrupos)) grupo_corrente = 1;
  let posicao = getRandomInt(1, Classe.alunos.length) - 1
  let aluno = Classe.alunos[posicao]

  Group[`grupo_${grupo_corrente}`].push(aluno)
  Classe.alunos.splice(posicao, 1);
  grupo_corrente += 1;
}

let filename = argv.i.split("/")[1].split(".json")[0]

fs.writeFile(`${argv.o}/${filename}_${argv.s}.json`, JSON.stringify({
  Group,
  hardskills_atividade: Classe.hardskills_atividade

}, null, 2), function (err) {
  if (err) throw err;
}
);


