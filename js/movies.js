export class MovieCard {
  static search(moviename) {
    const endpoint = ``;
  }
}

// estrutura
export class Movies {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@film-favorites")) || [];

    console.log(this.entries);
  }

  delete(movie) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.name !== movie.name
    );

    this.entries = filteredEntries;
    this.update();
  }
}

// visualização
export class MoviesView extends Movies {
  constructor(root) {
    super(root);

    this.ul = this.root.querySelector("ul");

    this.update();
  }

  update() {
    this.removeAllLi();

    this.entries.forEach((movie) => {
      const card = this.createCard();

      card.querySelector(".movie img").src = movie.img;
      card.querySelector(
        ".movie img"
      ).alt = `Imagem da capa do filme ${movie.name}`;

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

    li.innerHTML = `
    <li class="movie">
      <img
        src=""
        alt=""
        />
        <button class="btn-remove">&times;</button>
    </li>
    `;

    return li;
  }

  removeAllLi() {
    this.ul.querySelectorAll("li.movie").forEach((li) => {
      li.remove();
    });
  }
}
