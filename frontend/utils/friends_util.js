export const getFriends = () => (
  $.ajax({
    method: "GET",
    url: "/api/friendships"
  })
);

export const requestFriendship = data => (
  $.ajax({
    method: "POST",
    url: "/api/friendships/",
    data
  })
);

export const acceptFriendship = friendshipId => (
  $.ajax({
    method: "PATCH",
    url: `/api/friendships/${friendshipId}`,
    data: { accepted: true }
  })
);

export const deleteFriend = friendshipId => (
  $.ajax({
    method: "DELETE",
    url: `/api/friendships/${friendshipId}`
  })
);