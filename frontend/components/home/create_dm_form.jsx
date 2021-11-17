import React, { useRef, useState, useEffect } from "react";

const CreateDmForm = ({ friends, createDm, closeForm }) => {
  const [checked, setChecked] = useState({});
  const [search, setSearch] = useState("");
  const [checkCount, setCheckCount] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = e => { if (containerRef.current && !containerRef.current.contains(e.target)) closeForm(); }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [containerRef]);

  const handleCheck = (e, friend) => {
    if (e.target.checked) {
      setCheckCount(checkCount + 1);
      setChecked(Object.assign({}, checked, { [friend.id]: Object.assign({}, friend, {order: checkCount}) }));
      setSearch("");
    } else { uncheck(friend.id) };
  };

  const uncheck = friendId => {
    const { [friendId]: uncheckedFriend, ...checkedFriends } = checked;
    setChecked(checkedFriends);
  };

  const friendsList = friends.filter(friend => friend.accordTag.startsWith(search)).map(friend => (
    <label id={`dm-friend-${friend.id}`} key={`dm-friend-${friend.id}`}>
      <div className="friend-info">
        <img src={friend.profilePhotoUrl || window.logo} alt="profile" />
        <p>{friend.username}<span>#{friend.tag}</span></p>
      </div>
      <input type="checkbox" name="friend" value={friend.id} onChange={e => handleCheck(e, friend)}/>
      <img className="checkbox" src={checked[friend.id] ? window.checked : window.unchecked} alt="" />
    </label>
  ));

  const checkedList = Object.values(checked).map(friend => (
    <div style={{ order: friend.order }} key={`checked-friend-${friend.id}`} onClick={() => { document.querySelector(`#dm-friend-${friend.id} > input`).checked = false; uncheck(friend.id); }} >
      <p>{friend.username}</p>
      <img src={window.xButton} alt="X" />
    </div>
  ));

  const handleSubmit = e => {
    e.preventDefault();
    const checkedFriends = Object.values(checked);
    if(!checkedFriends.length) return;
    checkedFriends.length > 1 ? createDm(null, checkedFriends) : createDm(checkedFriends[0].id);
    closeForm();
  };

  return (
    <form id="create-dm-form" ref={containerRef} onSubmit={handleSubmit}>
      <h3>Select Friends</h3>
      <input type="text" placeholder="Find or start a conversation" value={search} onChange={e => setSearch(e.target.value)}/>
      <ul id="checked-friends">{checkedList}</ul>
      <ul>{friendsList}</ul>
      <div>
        <button className="form-button" disabled={!Object.keys(checked).length}>{Object.keys(checked).length > 1 ? "Create Group DM" : "Create DM"}</button>
      </div>
    </form>
  )
};

export default CreateDmForm;