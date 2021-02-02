const url = 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';
let qtdMasculino = 0;
let qtdFeminino = 0;
let mediaIdade = 0;
let somaIdade = 0;

let data = [];


window.addEventListener('load', () => {
    const dadosId = document.querySelector('#dadosId');
    const estatisticasId = document.querySelector('#estatisticasId');
    const pesquisaId = document.querySelector('#pesquisaId');
    const buttonId = document.querySelector('#buttonId');
    userFetch();
});

async function userFetch(){
    const res = await fetch(url);
    const json = await res.json();
    console.log(json);

    data = json.map(({name, picture, dob, gender, login}) => {

        return{
            name: `${name.first} ${name.last}`,
            photo:picture.large,
            age: dob.age,
            gender: gender,
            id: login.uuid
        }       
    });  
}

