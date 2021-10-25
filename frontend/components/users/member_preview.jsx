import React, { useState, useEffect } from "react";

const MemberPreview = ({ member, top }) => {
  const handleSubmit = () => null;
  const [maxTop, setMaxTop] = useState(null);
  const [loading, setLoading] = useState(true);

  let documentHeight, previewHeight;

  useEffect(() => {
    if (!loading) return;

    const preview = document.getElementById("member-preview");
    if (maxTop) {
      setTimeout(() => { preview.style.transition = "top 0.2s" }, 200);
    } else if (preview) {
      documentHeight = document.getElementById("app").getBoundingClientRect().height;
      previewHeight = preview.getBoundingClientRect().height;
      setMaxTop(documentHeight - previewHeight - 11);
    }
  });
  

  return (
    <div id="member-preview" style={{ top: (maxTop ? Math.min(top, maxTop) : top) }}>
      <img src={member.profilePhotoUrl || window.logo} alt="profile" />
      <p>{member.username}</p><span>#{member.tag}</span>
      <hr />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder={`Message @${member.username}`} />
      </form>
    </div> 
  );
};

export default MemberPreview;