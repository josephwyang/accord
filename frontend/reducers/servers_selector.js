export const publicServers = state => Object.values(state.entities.servers).filter(server => server.public);

export const publicServersByGenre = (state, genre) => {
  if (!genre) { return publicServers(state) }
  return Object.values(state.entities.servers).filter(
    server => server.public && server.genre === genre
  );
};