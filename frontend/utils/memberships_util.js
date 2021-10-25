export const postMembership = data => (
  $.ajax({
    method: "POST",
    url: "/api/memberships",
    data
  })
);

export const deleteMembership = data => (
  $.ajax({
    method: "DELETE",
    url: "/api/membership",
    data
  })
);