export class MovieCard {
  static search(movietitle) {
    const endpoint = `https://omdbapi.com/?apikey=ca421eed&s=${movietitle}`;

    return fetch(endpoint)
      .then((data) => data.json())
      .then(({ Search }) => {
        if (Search && Search.length > 0) {
          const { Title, Poster } = Search[0];
          return { Title, Poster };
        } else {
          // Trate o caso em que nenhum filme foi encontrado
          throw new Error("Nenhum filme encontrado");
        }
      });
  }
}
