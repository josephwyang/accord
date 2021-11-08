import React, { useState, useEffect } from "react";

const MemberPreview = ({ member, top, createDm, postMessage, currentUserId }) => {
  const [maxTop, setMaxTop] = useState(null);
  const [body, setBody] = useState("");

  let documentHeight, previewHeight;

  useEffect(() => {
    const preview = document.getElementById("member-preview");
    if (maxTop) {
      setTimeout(() => { preview.style.transition = "top 0.2s" }, 200);
    } else if (preview) {
      documentHeight = document.getElementById("app").getBoundingClientRect().height;
      previewHeight = preview.getBoundingClientRect().height;
      setMaxTop(documentHeight - previewHeight - 11);
    }
  });

  useEffect(() => {
    if (document.querySelector("#member-preview input")) document.querySelector("#member-preview input").focus();
  }, [member]);

  const handleSubmit = e => {
    e.preventDefault();
    const createdDm = createDm(member.id);
    if (typeof createdDm === "number") {
      postMessage({
        channelId: createdDm,
        senderId: currentUserId,
        body
      });
    } else {
      createdDm.then(channelId => {
        postMessage({
          channelId,
          senderId: currentUserId,
          body
        });
      });
    };
  };

  return (
    <div id="member-preview" style={{ top: (maxTop ? Math.min(top, maxTop) : top) }}>
      <img src={member.profilePhotoUrl || window.logo} alt="profile" />
      <p>{member.username}</p><span>#{member.tag}</span>
      <hr />
      {currentUserId === member.id ? null :
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder={`Message @${member.username}`} value={body} onChange={e => setBody(e.target.value)} />
        </form>}
    </div> 
  );
};

export default MemberPreview;