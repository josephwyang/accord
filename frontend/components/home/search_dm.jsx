import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SearchDm = ({ dms, friends, createDm, closeForm }) => {
  const [search, setSearch] = useState("");
  const handleEsc = e => { if (e.key === "Escape") closeForm(); };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  let searchable = Object.values(dms);
  const onlyDms = searchable.filter(chat => chat.user);

  friends.forEach(friend => {
    if (!onlyDms.some(dm => friend.id === dm.user.id)) searchable.push(friend)
  });

  const getName = chat => {
    if (chat.user) return chat.user.username;
    if (chat.username) return chat.username;
    return chat.name;
  };

  const searchedList = searchable.filter(chat => getName(chat).includes(search)).sort((a, b) => getName(a).toLowerCase().localeCompare(getName(b).toLowerCase())).map(chat => (
    chat.username ? 
    <li key={`friend-${chat.id}`} onClick={() => {
      closeForm();
      createDm(chat.id);
    }}>
      <img src={chat.profilePhotoUrl || window.logo} alt="profile" />
      <p className="ellipsis">{chat.username}<span>{`#${chat.tag}`}</span></p>
    </li> :
    <NavLink key={chat.id} to={`/@me/${chat.id}`} activeClassName="selected" onClick={() => closeForm()}>
      {chat.user ?
        <img src={chat.user.profilePhotoUrl || window.logo} alt="profile" /> :
        chat.icon ?
        <img src={chat.icon} alt="profile" /> :
        <div><img src={window.group} alt="profile" /></div>}
      <p className="ellipsis">{chat.name || chat.user.username}<span>{chat.user ? `#${chat.user.tag}` : null}</span></p>
    </NavLink>
  ));

  return (
    <div id="search-dm-modal">
      <div className="modal-screen" onClick={() => closeForm()}></div>
      <form className="settings-modal">
        <input type="text" placeholder="Where would you like to go?" value={search} onChange={e => setSearch(e.target.value)} autoFocus />
        {searchedList.length ? <ul>{searchedList}</ul> :
        <div id="no-dms">
          <img src={window.failedSearch} alt="no search matches"/>
          <p>Can't seem to find what you're looking for</p>
        </div> }
        <div className="footer">
          <hr />
          <p>Try searching for usernames of friends or of users you have direct messages with.</p>
          <p>You can also search for names of group chats.</p>
        </div>
      </form>
    </div>
  )
};

export default SearchDm;