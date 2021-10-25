export const publicServers = state => state.entities.publicServers.filter(server => server.public);

export const publicServersByGenre = (state, genre) => {
  if (!genre) { return publicServers(state) }
  return state.entities.publicServers.filter(
    server => server.public && server.genre === genre
  );
};

export const fullServer = (state, serverId) => {
  let {icon, description, banner, ...server} = state.entities.servers[serverId];
  return ({
    icon: icon || "",
    description: description || "",
    banner: banner || "",
    ...server
  })
}