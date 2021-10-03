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

export const verifyPhoneNumber = phoneNumber => (
  $.ajax({
    method: "GET",
    url: "/api/users/verify",
    phoneNumber
  })
);

export const patchUser = formData=> (
  $.ajax({
    method: "PATCH",
    url: `/api/users/${formData.get("user[id]")}`,
    data: formData,
    contentType: false,
    processData: false
  })
);

export const deleteUser = userId => (
  $.ajax({
    method: "DELETE",
    url: `/api/users/${userId}`
  })
);