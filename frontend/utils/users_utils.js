export const getUsers = () => (
  $.ajax({
    method: "GET",
    url: "/api/users"
  })
);

export const getUser = id => (
  $.ajax({
    method: "GET",
    url: `/api/users/${id}`
  })
);

export const postUser = user => (
  $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user }
  })
);