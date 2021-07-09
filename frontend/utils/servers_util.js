export const getServers = () => (
  $.ajax({
    method: "GET",
    url: "/api/servers"
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