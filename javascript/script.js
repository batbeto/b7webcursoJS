async function clicou(){
   let response = await fetch('https://jsonplaceholder.typicode.com/posts');
   let json = await response.json();
   alert (`Titulo ${json[0].title}`);
   alert('Clicou');
}

async function inserir(){
  let response = await fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify({
      title: 'Titulo qualquer',
      body: 'Corpo qualquer',
      userId: 2
    })
  })
  let json = await response.json();
  console.log(json);
}

document.querySelector('#inserir').addEventListener('click',inserir);
document.querySelector('#botao').addEventListener('click',clicou);