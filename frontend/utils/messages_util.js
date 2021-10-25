export const getMessage = messageId => (
  $.ajax({
    method: "GET",
    url: `/api/messages/${messageId}`
  })
);

export const postMessage = message => (
  $.ajax({
    method: "POST",
    url: "/api/messages",
    data: { message }
  })
);

export const patchMessage = message => (
  $.ajax({
    method: "PATCH",
    url: `/api/messages/${message.id}`,
    data: { message }
  })
);

export const deleteMessage = messageId => (
  $.ajax({
    method: "DELETE",
    url: `/api/messages/${messageId}`
  })
);