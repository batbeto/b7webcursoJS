const soma = function(x,y){
  return x+y;
}

const imprimirResultado = function (a, b, operacao = soma ){
  console.log(operacao(a,b))
}


imprimirResultado(3,4);

imprimirResultado(3,4, function(x, y){
  return x - y;
})

imprimirResultado (3,4, (x,y) => x*y)


const pessoa = {
  falar: function ( ) {
    console.log('Olá')
  }
}

pessoa.falar()

const fabricantes = ["Mercedes", "Audi", "Fiat"];

function imprimir (nome, indice){
  console.log(`${indice+1}. ${nome}`);
}

fabricantes.forEach(imprimir)
fabricantes.forEach((a) => console.log(a))



const notas = [0,2,3,5,5.5,5.3,6,7,8,9,10];


let notasBaixas = [];

for (let i in notas){
  if (notas[i] < 7) notasBaixas.push(notas[i])
}

console.log(notasBaixas);

notasBaixas = notas.filter(function (nota) {
  return nota < 7
});

console.log(notasBaixas)

const notasBaixas2 = notas.filter((a) => {return a <7});
console.log(notasBaixas2)


document.getElementsByTagName('body')[0].onclick = (e) => { console.log('O evento ocorreu!')}