class Videojuego {
	constructor(jProduct,name,price,category,genre) {
		
		if(jProduct != undefined) {
			this.name = jProduct.name;
			this.price = jProduct.price;
			this.category = jProduct.category;
			this.genre = jProduct.genre;
			this.id = jProduct.id;
		}else {
			this.name = name;
			this.price = price;
			this.category = category;
      this.genre = genre;
      this.id = this.getId();
		}
	}
	
	getCategoryText() {
		let texto = "Error";
		
		switch(this.category) {
			case Videojuego.CAT_XBOX:
				texto = "XBOX 360";
				break;
			case Videojuego.CAT_PS4:
				texto = "PS4";
				break;
			case Videojuego.CAT_SWITCH:
				texto = "Switch";
				break;
			case Videojuego.CAT_PC:
				texto = "PC";
				break;
		}
		return texto;
	}

  getGenreText() {
    let texto = "Error";

    switch(this.genre) {
      case Videojuego.GEN_ACTION:
        texto = "ACCION";
        break;
      case Videojuego.GEN_PLATFORM:
        texto = "PLATAFORMAS";
        break;
      case Videojuego.GEN_FPS:
        texto = "FPS";
        break;
    }
    return texto;
  }

  getId() {
    return Date.now()
  }


}

Videojuego.CAT_XBOX = 1;
Videojuego.CAT_PS4 = 2;
Videojuego.CAT_SWITCH = 3;
Videojuego.CAT_PC = 4;

Videojuego.GEN_ACTION = 1;
Videojuego.GEN_PLATFORM = 2;
Videojuego.GEN_FPS = 3;

