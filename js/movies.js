import { MovieCard } from "./movieCard.js";

// estrutura
export class Movies {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("film-favorites:")) || [];
  }

  save() {
    localStorage.setItem("film-favorites:", JSON.stringify(this.entries));
  }

  async add(movietitle) {
    let movieExists = this.entries.find((entry) => entry.Title === movietitle);

    console.log(movieExists);

    if (movieExists) return;

    try {
      const movie = await MovieCard.search(movietitle);

      this.entries = [movie, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      console.error("Filme não encontrado");
    }
  }

  delete(movie) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.Title !== movie.Title
    );

    this.entries = filteredEntries;
    this.update();
    this.save();
  }
}

// visualização
export class MoviesView extends Movies {
  constructor(root) {
    super(root);

    this.ul = this.root.querySelector("ul");

    this.update();
    this.onadd();
  }

  onadd() {
    const btnAdd = this.root.querySelector(".btn-add");
    btnAdd.onclick = () => {
      const { value } = this.root.querySelector("input");

      this.add(value);
    };
  }

  update() {
    this.removeAllLi();

    this.entries.forEach((movie) => {
      const card = this.createCard();

      card.querySelector(".movie img").src = movie.Poster;
      card.querySelector(
        ".movie img"
      ).alt = `Imagem da capa do filme ${movie.Title}`;

      card.querySelector(".btn-remove").onclick = () => {
        const isOk = confirm("Certeza que quer apagar o filme?");

        if (isOk) {
          this.delete(movie);
        }
      };

      this.ul.append(card);
    });
  }

  createCard() {
    const li = document.createElement("li");
    li.classList.add("movie");

    li.innerHTML = `
      <img src="" alt="" />
      <button class="btn-remove">&times;</button>
    `;

    return li;
  }

  removeAllLi() {
    this.ul.querySelectorAll("li.movie").forEach((li) => {
      li.remove();
    });
  }
}
