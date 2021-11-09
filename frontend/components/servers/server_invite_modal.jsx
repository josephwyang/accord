import React, { useEffect, useState } from "react";

const ServerInviteModal = ({ servers, friends, dms, server, postMembership, closeModal }) => {
  const [search, setSearch] = useState("");
  const handleEsc = e => { if (e.key === "Escape") closeModal(); };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  let searchable = Object.values(dms);
  const onlyDms = searchable.filter(chat => chat.user);

  Object.values(friends).forEach(friend => {
    if (!onlyDms.some(dm => friend.id === dm.user.id)) searchable.push(friend)
  });

  const getName = chat => {
    if (chat.user) return chat.user.username;
    if (chat.username) return chat.username;
    return chat.name;
  };

  const getIcon = chat => {
    if (chat.username) return chat.profilePhotoUrl || window.logo;
    if (chat.user) return chat.user.profilePhotoUrl || window.logo;
    return chat.icon || window.group;
  }

  const searchedServerList = Object.values(servers).filter(chat => getName(chat).includes(search)).sort((a, b) => (getName(a) < getName(b) ? -1 : 1)).map(chat => (
    <li key={`${chat.username ? "friend" : "server"}-${chat.id}`}>
      {chat.icon ? <img className="chat-icon" src={chat.icon} alt="icon" /> : <div className="chat-icon">{chat.name.split(" ").map(word => word[0]).slice(0, 2)}</div>}
      <p>{chat.name}</p>
      <button>Invite</button>
    </li>
  ));

  const searchedDmList = searchable.filter(chat => getName(chat).includes(search)).sort((a, b) => (getName(a) < getName(b) ? -1 : 1)).map(chat => (
    <li key={`${chat.username ? "friend" : "server"}-${chat.id}`}>
      {<img className="chat-icon" src={getIcon(chat)} alt="icon" />}
      <p>{chat.user ? chat.user.username : chat.username || chat.name}{chat.user || chat.username ? <span>{`#${chat.tag || chat.user.tag}`}</span> : null}</p>
      <button>Invite</button>
    </li>
  ));


  return (
    <div id="server-invite-modal">
      <div className="modal-screen" onClick={() => closeModal()}></div>
      <div className="settings-modal">
        <h1>{`INVITE FRIENDS TO ${server.name.toUpperCase()}`}</h1>
        <input type="text" placeholder="Search for friends, dms, or servers" value={search} onChange={e => setSearch(e.target.value)} autoFocus />
        <img src={window.search} alt="search" />
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
  );
};

export default ServerInviteModal;