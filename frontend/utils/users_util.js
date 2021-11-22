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

export const getUserByTag = (accordTag) => {
  const [username, tag] = accordTag.split("#");

  return(
    $.ajax({
      method: "GET",
      url: `/api/users/${accordTag}`,
      data: { username, tag }
    })
  )
};


export const verifyPhoneNumber = phoneNumber => (
  $.ajax({
    method: "GET",
    url: "/api/users/verify",
    data: { phone_number: phoneNumber }
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

export const deleteUser = formData => (
  $.ajax({
    method: "DELETE",
    url: `/api/users/${formData.get("user[id]")}`,
    data: formData,
    contentType: false,
    processData: false
  })
);