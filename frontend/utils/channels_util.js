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

export const patchChannel = channel => (
  $.ajax({
    method: "PATCH",
    url: `/api/channels/${channel.id}`,
    data: { channel }
  })
);

export const deleteChannel = channelId => (
  $.ajax({
    method: "DELETE",
    url: `/api/channels/${channelId}`
  })
);