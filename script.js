// List of Eleon image filenames
const eleons = [
  "abyssnaw.png","admerrull.png","aquietus.png","argarfio.png","arraknit.png","astrafin.png","astrolure.png","bastolith.png","boogihop.png","cascub.png","celebreel.png","cerberio.png","chirrook.png","cloral.png","clustarch.png","crustore.png","discorch.png","dodumb.png","faellion.png","freever.png","glassora.png","glassoraoffensive.png","growlet.png","heirite.png","heirysalis.png","igniram.png","jestigator.png","larrona.png","lilibud.png","lunalis.png","lurmaw.png","marchess.png","marimoth.png","minarch.png","moakanter.png","morbright.png","moreanie.png","morfur.png","morjester.png","morlidae.png","mormancy.png","morswept.png","morterra.png","narcloak.png","nautitan.png","ninark.png","nocturkle.png","nymantid.png","palmoko.png","pinnux.png","puppetear.png","pyraglyph.png","pyrurnace.png","quibble.png","quinferno.png","rhiron.png","rootitan.png","ropyrus.png","salagmite.png","scoraptor.png","sephrodite.png","serpalisk.png","shinark.png","spoilurk.png","squalleer.png","squipup.png","syrinfly.png","timpel.png","toxplash.png","umbrystal.png","valograr.png","valuchar.png","victrious.png","vinuki.png","yawnito.png"
];

const gallery = document.getElementById('gallery');
const searchBar = document.getElementById('searchBar');

function createEleonCard(name) {
  const card = document.createElement('div');
  card.className = 'eleon-card';
  card.id = `eleon-${name.replace(/\W/g, '').toLowerCase()}`;

  const img = document.createElement('img');
  const baseName = name.replace('.png', '');
  img.src = `images/${name}`;
  img.alt = baseName;
  img.className = 'eleon-img';

  const shinyMap = {
    bastolith: 'bastolith-shiny.png',
    darkargarfio: 'dark-argarfio-shiny.png',
    glassoraoffensive: 'glassora-offensive-shiny.png',
    morterra: 'morterra-shiny.png',
    quinferno: 'quinferno-shiny.png',
    serpalisk: 'serpalisk_shiny.png',
    victrious: 'victrious-shiny.png'
  };

  const shinyFile = shinyMap[baseName];
  if (shinyFile) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const isShiny = img.dataset.isShiny === 'true';
      if (isShiny) {
        img.src = `images/${baseName}.png`;
      } else {
        img.src = `images-shiny/${shinyFile}`;
      }
      img.dataset.isShiny = (!isShiny).toString();
    });
  }

  const eleonName = document.createElement('div');
  eleonName.className = 'eleon-name';
  eleonName.textContent = baseName;

  card.appendChild(img);
  card.appendChild(eleonName);
  return card;
}

function renderGallery(filter = '') {
  gallery.innerHTML = '';
  let found = false;
  eleons.forEach(name => {
    const displayName = name.replace('.png', '');
    if (displayName.toLowerCase().includes(filter.toLowerCase())) {
      gallery.appendChild(createEleonCard(name));
      found = true;
    }
  });
  if (!found) {
    gallery.innerHTML = '<div style="color:#e17055;">No Eleon found.</div>';
  }
}


searchBar.addEventListener('input', e => {
  renderGallery(e.target.value);
});

searchBar.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const value = e.target.value.trim().toLowerCase();
    if (!value) return;
    const match = eleons.find(name => name.replace('.png', '').toLowerCase() === value);
    if (match) {
      const cardId = `eleon-${value.replace(/\W/g, '')}`;
      const card = document.getElementById(cardId);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('highlight');
        setTimeout(() => card.classList.remove('highlight'), 1200);
      }
    }
  }
});

// Optional: highlight style
const style = document.createElement('style');
style.textContent = `.highlight { box-shadow: 0 0 0 4px #00cec9, 0 8px 24px rgba(0,0,0,0.18) !important; }`;
document.head.appendChild(style);

// Initial render
renderGallery();

