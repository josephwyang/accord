import React, { useEffect, useState } from "react";

const ServerInviteModal = ({ servers, friends, dms, server, currentUserId, firstChannelId, getServer, postMessage, closeModal, ...props }) => {
  const [search, setSearch] = useState("");
  const [invitedDms, setInvitedDms] = useState([]);
  const handleEsc = e => { if (e.key === "Escape") closeModal(); };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  let searchable = Object.values(dms);
  const onlyDms = searchable.filter(chat => chat.user);

  Object.values(friends).forEach(friend => {
    if (!onlyDms.some(dm => friend.id === dm.user.id)) searchable.push(friend);
  });

  const getName = chat => {
    if (chat.user) return chat.user.username;
    if (chat.username) return chat.username;
    return chat.name;
  };

  const getIcon = chat => {
    if (chat.username) return <img className="chat-icon" src={chat.profilePhotoUrl || window.logo} alt="icon" />;
    if (chat.user) return <img className="chat-icon" src={chat.user.profilePhotoUrl || window.logo} alt="icon" />;
    return chat.icon ? <img className="chat-icon" src={chat.icon} alt="icon" /> : <div className="chat-icon default-gc"><img src={window.group} alt="icon" /></div>;
  }

  const searchedServerList = Object.values(servers).filter(chat => chat.id !== server.id && chat.name.includes(search)).sort((a, b) => (getName(a) < getName(b) ? -1 : 1)).map(chat => (
    <li key={`server-${chat.id}`}>
      {chat.icon ? <img className="chat-icon" src={chat.icon} alt="icon" /> : <div className="chat-icon">{chat.name.split(" ").map(word => word[0]).slice(0, 2)}</div>}
      <p className="ellipsis">{chat.name}</p>
      <button onClick={() => {
        getServer(chat.id).then(({ payload }) => props.history.push({
          pathname: `/channels/${chat.id}/${firstChannelId(payload.channels)}`,
          state: { invitation: server.id }
        }));
        closeModal();
      }}>Invite</button>
    </li>
  ));

  const searchedDmList = searchable.filter(chat => getName(chat).includes(search)).sort((a, b) => (getName(a) < getName(b) ? -1 : 1)).map(chat => {
    const invited = invitedDms.some(dm => dm === (chat.username ? "friend-" : "server-") + chat.id);
    
    return (<li key={`${chat.username ? "friend" : "server"}-${chat.id}`}>
      {getIcon(chat)}
      <p>{chat.user ? chat.user.username : chat.username || chat.name}{chat.user || chat.username ? <span>{`#${chat.tag || chat.user.tag}`}</span> : null}</p>
      <button className={invited ? "invited" : ""} onClick={() => {
        postMessage({
          senderId: currentUserId,
          channelId: chat.channelId,
          body: "INVITATION",
          invitation: server.id
        });
        setInvitedDms(invitedDms.concat([(chat.username ? "friend-" : "server-") + chat.id]));
      }}>{invited ? "Sent" : "Invite"}</button>
    </li>
  )});


  return (
    <div id="server-invite-modal">
      <div className="modal-screen" onClick={() => closeModal()}></div>
      <div className="settings-modal">
        <h2 className="ellipsis">INVITE FRIENDS TO '{server.name.toUpperCase()}'</h2>
        <input type="text" placeholder="Search for friends, dms, or servers" value={search} onChange={e => setSearch(e.target.value)} autoFocus />
        <img src={window.search} alt="search" />
        <div>
          {searchedServerList.length + searchedDmList.length ? <>
            {searchedServerList.length ? <>
              <h3>SERVERS</h3>
              <ul>{searchedServerList}</ul>
            </> : null}
            {searchedDmList.length ? <>
              <h3>DMS AND FRIENDS</h3>
              <ul>{searchedDmList}</ul>
            </> : null}
          </> : <p>NO RESULTS FOUND</p>}
        </div>
      </div>
    </div>
  );
};

export default ServerInviteModal;