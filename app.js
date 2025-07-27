const API_BASE = 'https://rickandmortyapi.com/api/character';
let nextPage = null;
let prevPage = null;

const charactersContainer = document.getElementById('characters');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

async function fetchCharacters(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    nextPage = data.info.next;
    prevPage = data.info.prev;

    nextBtn.disabled = !nextPage;
    prevBtn.disabled = !prevPage;

    renderCharacters(data.results);
  } catch (error) {
    charactersContainer.innerHTML = '<p>Error al cargar personajes.</p>';
  }
}

function renderCharacters(characters) {
  charactersContainer.innerHTML = '';
  characters.forEach(char => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}" />
      <h3>${char.name}</h3>
      <p><strong>Estado:</strong> ${char.status}</p>
      <p><strong>Especie:</strong> ${char.species}</p>
    `;
    charactersContainer.appendChild(card);
  });
}

function buildUrl(pageUrl = API_BASE) {
  const name = document.getElementById('name').value;
  const status = document.getElementById('status').value;
  const gender = document.getElementById('gender').value;

  const url = new URL(pageUrl);

  if (name) url.searchParams.set('name', name);
  if (status) url.searchParams.set('status', status);
  if (gender) url.searchParams.set('gender', gender);

  return url.toString();
}

// Eventos
document.getElementById('filterBtn').addEventListener('click', () => {
  fetchCharacters(buildUrl());
});

nextBtn.addEventListener('click', () => {
  if (nextPage) fetchCharacters(buildUrl(nextPage));
});

prevBtn.addEventListener('click', () => {
  if (prevPage) fetchCharacters(buildUrl(prevPage));
});

// Cargar inicial
fetchCharacters(API_BASE);
