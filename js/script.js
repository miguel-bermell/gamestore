
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
      console.log(videoGame)
      //Añadir el videojuego
      videoGame.push(game1)
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
        
        for(let paintgame of videojuegos) {
          let res = new Videojuego(paintgame)
          paintGame(res)
        }
      } 
    })
}

function paintGame(game) {
	
  if(game != null && game != undefined) {
    const table = document.getElementById('table');
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const btnDelete = document.createElement('td')
    
    btnDelete.classList.add('delete-game');
    btnDelete.innerText = 'X';
    let tdName = document.createElement("td");
    tdName.innerHTML = game.name;	
    tr.appendChild(tdName);
    tr.appendChild(btnDelete);
    
    let tdPrice = document.createElement("td");
    tdPrice.innerHTML = game.price;	
    tr.appendChild(tdPrice);
    tr.appendChild(btnDelete);
    
    let tdAmount = document.createElement("td");
    tdAmount.innerHTML = game.getCategoryText();
    tr.appendChild(tdAmount);
    tr.appendChild(btnDelete);
    
    let tdCategory = document.createElement("td");
    tdCategory.innerHTML = game.getGenreText();	
    tr.appendChild(tdCategory);
    tr.appendChild(btnDelete);
    table.appendChild(tr);
    btnDelete.onclick = () => {
    deleteGame((game.id))
    }
  }
  
}


function deleteGame(id) {
  // console.log(id)
  //Encontrar posición
  let gettingObj = desStringlify(getVideogame(id));
  let gamePos = gettingObj.findIndex(game => game.id == id);
  console.log(gettingObj);
  //Eliminar del Array
  try {
    gettingObj.splice(gamePos,1);
    //Stringlifizar
    sincStorage(gettingObj);
    removeItemHtml(gamePos)
  } catch (error) {
    console.error(error)
  }
  
}

function removeItemHtml(pos) {
  table.removeChild(table.childNodes[pos]);
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