export const getChannel = channelId => (
  $.ajax({
    method: "GET",
    url: `/api/channels/${channelId}`
  })
);

export const postChannel = channel => (
  $.ajax({
    method: "POST",
    url: "/api/channels",
    data: { channel }
  })
);