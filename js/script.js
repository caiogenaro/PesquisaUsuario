const url =
  'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';
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
  buscarUser();
});

async function userFetch() {
  const res = await fetch(url);
  const json = await res.json();
  console.log(json);

  data = json.map(({ name, picture, dob, gender, login }) => {
    return {
      name: `${name.first} ${name.last}`,
      filterName: `${name.first} ${name.last}`.toLowerCase,
      photo: picture.large,
      age: dob.age,
      gender: gender,
      id: login.uuid,
    };
  });
}

function buscarUser() {
  pesquisaId.addEventListener('keyup', filterUser);
  buttonId.addEventListener('click', filterUser);
}

function filterUser(index) {
  const searchText = index.target.value.trim();
  const searchLenght = searchText.lenght;
  const searchTextLowerCase = searchText.toLowerCase();
  const filterUsers = data.filter((user) =>
    user.filterName.includes(searchTextLowerCase)
  );
  if (filterUsers.length === 0) {
    showNoSearch();
  }
  showUsers(filterUsers);
}

function showNoSearch() {
  dadosId.innerHTML = `<h2>NADA A SER FILTRADO</h2>`;
  estatisticasId.innerHTML = `<h2>NADA A SER EXIBIDO</h2>`;
}

function showUsers(index) {

}
