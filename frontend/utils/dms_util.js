export const getDms = () => (
  $.ajax({
    method: "GET",
    url: "/api/servers/dms"
  })
);