export const postReaction = reaction => (
  $.ajax({
    method: "POST",
    url: "/api/reactions",
    data: { reaction }
  })
);

export const deleteReaction = reactionId => (
  $.ajax({
    method: "DELETE",
    url: `/api/reactions/${reactionId}`
  })
);