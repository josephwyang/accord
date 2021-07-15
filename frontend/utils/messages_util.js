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