let url =
  "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo";
let qtdMasculino = 0;
let qtdFeminino = 0;
let mediaIdade = 0;
let somaIdade = 0;

let data = [];

window.addEventListener("load", async () => {
  const dadosId = document.querySelector("#dadosId");
  const estatisticasId = document.querySelector("#estatisticasId");
  const pesquisaId = document.querySelector("#pesquisaId");
  const buttonId = document.querySelector("#buttonId");
  const buttonId2 = document.querySelector("#buttonId2");
  await userFetch();
  buscarUser();
});

async function userFetch() {
  const res = await fetch(url);
  const json = await res.json();
  data = json.results.map((user) => {
    const { name, picture, dob, gender, login } = user;
    return {
      name: `${name.first} ${name.last}`,
      filterName: `${name.first} ${name.last}`.toLowerCase(),
      photo: picture.large,
      age: dob.age,
      gender: gender,
      id: login.uuid,
    };
  });
}

function buscarUser() {
  pesquisaId.addEventListener("keyup", filterUser);
  buttonId.addEventListener("click", () => filterUserClick(pesquisaId.value.trim()));
  pesquisaId.addEventListener("backspace", filterUser);
  
}

function filterUserClick(index){
  if(index.length == 0){
    showNoSearch();
  }
}

function filterUser(index) {

  if(index.target.selectionEnd == 0){
    return;
  }
  
  console.log(index.target.selectionEnd);
  const searchText = index.target.value.trim();
  const searchLength = searchText.length;
  const searchTextLowerCase = searchText.toLowerCase();
  const filterUsers = data.filter((user) => {
    return user.filterName.includes(searchTextLowerCase);
  });
  console.log(filterUsers.valueOf());
  if (filterUsers.length == 0) {
    showNoSearch();
  }
  showUsers(filterUsers);
}

function showNoSearch() {
  dadosId.innerHTML = `<h2>NADA A SER FILTRADO</h2>`;
  estatisticasId.innerHTML = `<h2>NADA A SER EXIBIDO</h2>`;
}

function showUsers(index) {
  
  const h2 = document.createElement("h2");
  const ul = document.createElement("ul");
  h2.textContent = index.length + "Usuario(s) Encontrado(s)";

  index.forEach(({ name, photo, age }) => {
    const li = document.createElement("li");
    const img = `<img class='foto' src=${photo} alt=${name} title=${name}/>`;
    const span = `<span>${name}, ${age} Anos</span>`;
    li.innerHTML = `${img} ${span}`;
    ul.appendChild(li);
  });

  somaIdade = index.reduce((acc, cur) => acc + cur.age, 0);
  mediaIdade = (somaIdade / index.length).toFixed(2);
  qtdMasculino = index.filter((genero) => genero.gender === "male").length;
  qtdFeminino = index.filter((genero) => genero.gender === "female").length;

  dadosId.innerHTML = "";
  dadosId.appendChild(h2);
  dadosId.appendChild(ul);

  estatisticasId.innerHTML = `
  <h2>Estatísticas</h2>
  <ul>
    <li>Sexo Masculino: ${qtdMasculino}</li>
    <li>Sexo Feminino: ${qtdFeminino}</li>
    <li>Soma das Idades: ${somaIdade}</li>
    <li>Media Idades: ${mediaIdade}</li>
  </ul>`;
  
}

function clearInput(){
  pesquisaId.value = '';  
}
