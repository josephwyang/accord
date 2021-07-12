export const postChannel = channel => (
  $.ajax({
    method: "POST",
    url: "/api/channels",
    data: { channel }
  })
);