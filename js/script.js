
function createGame() {
	let name = document.getElementById("name").value;
	let price = document.getElementById("price").value;
	let category = document.getElementById("category").value;
  let genre = document.getElementById("genre").value;
	console.log(name,price,category,genre)
	

	if(name != "" && price != "") {
		let game1 = new Videojuego(null,name,price,parseInt(category),parseInt(genre));
    
    paintGame(game1);
    
    if(getVideogame() == null) {
      let games = [];
      console.log(games)
      games.push(game1);
      console.log(games)
      //Pasar a JSON
      sincStorage(games);
      
    }else {
      //Pasar a objeto
      let videoGame = desStringlify(getVideogame());
      //Añadir el videojuego
      videoGame.push(game1)
      console.log(videoGame)
      //Pasar a JSON y localStorage
      sincStorage(videoGame);
    }

  }
}

eventListeners()
function eventListeners() {
  document.addEventListener('DOMContentLoaded', () => {
      
      if(desStringlify(getVideogame()) != null) {
        let videojuegos = desStringlify(getVideogame());
        convertToObj(videojuegos)
      } 
      
    })
    orderByPrice()
    orderByName()
}

function paintGame(game) {
	
  if(game != null && game != undefined) {
    const table = document.getElementById('table');
    const tr = document.createElement('tr');
    tr.id = game.id;
    const td = document.createElement('td');
    const btnDelete = document.createElement('td')
    
    btnDelete.classList.add('delete-game');
    btnDelete.innerText = 'X';
    let tdName = createTd(game.name)
    tr.appendChild(tdName);
    
    let tdPrice = createTd(game.price)

    tr.appendChild(tdPrice);
    let tdAmount = createTd(game.getCategoryText())
    tr.appendChild(tdAmount);
    
    let tdCategory = createTd(game.getGenreText())
    tr.appendChild(tdCategory);
    tr.appendChild(btnDelete);
    table.appendChild(tr);
    btnDelete.onclick = () => {
    deleteGame((game.id))
    }
  }
}

function createTd(text) {
  const td = document.createElement('td');
  td.innerText = text;
  return td;
}


function deleteGame(id) {
  //Encontrar posición
  let gettingObj = desStringlify(getVideogame(id));
  let gamePos = gettingObj.findIndex(game => game.id == id);
  console.log(gettingObj);
  //Eliminar del Array
  try {
    gettingObj.splice(gamePos,1);
    //Stringlifizar
    sincStorage(gettingObj);
    removeItemHtml(id)
  } catch (error) {
    console.error(error)
  }
  
}

function removeItemHtml(pos) {
  console.log(table,pos)
  //table.removeChild(table.childNodes[pos +1]);
  document.getElementById(pos).remove();
  
}


function orderByPrice() {
  const arrow = document.querySelector('.price');
  arrow.onclick = () => {
    arrow.classList.toggle('red');
    let gettingObj = desStringlify(getVideogame());
    console.log(gettingObj)
    gettingObj.sort((a,b) => a.price - b.price);
    sincStorage(gettingObj)
    clearHTML()
    convertToObj(gettingObj)
  }
}


function orderByName() {
  const arrow = document.querySelector('.game');
  arrow.onclick = () => {
    arrow.classList.toggle('red');
    let gettingObj = desStringlify(getVideogame());
    gettingObj.sort(
      function(a,b) {
        a = a.name.toLowerCase();
        b = b.name.toLowerCase();

        let res = 0;
        if(a > b) {
          res = 1
        }else if(a < b) {
          res = -1
        }
        return res;
      }
    )
    console.log(gettingObj)
    clearHTML()
    convertToObj(gettingObj)
  }
}

function clearHTML() {
  while(table.firstChild) {
    table.removeChild(table.firstChild)
  }
}

function sincStorage(game) {
  localStorage.setItem('Videogame', JSON.stringify(game))
}

function getVideogame() {
  return localStorage.getItem('Videogame'); 
}

function desStringlify(data) {
  return JSON.parse(data)
}

function convertToObj(value) {
  for(let paintgame of value) {
    let res = new Videojuego(paintgame)
    paintGame(res)
  }
}