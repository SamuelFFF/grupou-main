const Chance = require('chance');
const params = require('./config/parametros.js')();

const { turma, hardskills_atividade } = params;

const chance = new Chance(turma);
require('./ClassroomGenerate.js')(chance)

var fs = require('fs');
const { alunos, analise_hardskills_turma } = chance.classroom(params);

fs.writeFile(`turmas/${turma}.json`, JSON.stringify({
  alunos,
  analise: analise_hardskills_turma,
  hardskills_atividade
}, null, 2), function (err) {
  if (err) throw err;
  console.log('complete');
}
);

