export const getServers = () => (
  $.ajax({
    method: "GET",
    url: "/api/servers"
  })
);

export const getServer = serverId => (
  $.ajax({
    method: "GET",
    url: `/api/servers/${serverId}`
  })
);

export const getPublicServers = () => (
  $.ajax({
    method: "GET",
    url: "/api/servers/explore"
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

export const patchServer = (formData)=> (
  $.ajax({
    method: "PATCH",
    url: `/api/servers/${formData.get("server[id]")}`,
    data: formData,
    contentType: false,
    processData: false
  })
);

export const deleteServer = serverId => (
  $.ajax({
    method: "DELETE",
    url: `/api/servers/${serverId}`
  })
);