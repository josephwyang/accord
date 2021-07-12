export const getServers = () => (
  $.ajax({
    method: "GET",
    url: "/api/servers"
  })
);

export const getServer = id => (
  $.ajax({
    method: "GET",
    url: `/api/servers/${id}`
  })
);

export const postServer = formData => (
  $.ajax({
    method: "POST",
    url: "/api/servers",
    data: formData,
    contentType: false,
    processData: false
  })
);

export const getPublicServers = () => (
  $.ajax({
    method: "GET",
    url: "/api/servers/explore"
  })
);