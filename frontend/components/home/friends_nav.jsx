import React, { useState, useEffect } from "react";
import Bubble from "../misc/bubble";
import DeleteFriendModal from "./delete_friend_modal";

const FriendsNav = ({ dms, createDm, requestFriendship, acceptFriendship, deleteFriend, currentUserId, ...props }) => {
  const [nav, setNav] = useState("All");
  const [username, setUsername] = useState("");
  const [tag, setTag] = useState("#0000");
  const [disabled, setDisabled] = useState(true);
  const [deleteFriendModal, setDeleteFriendModal] = useState(null);
  const [addedUser, setAddedUser] = useState(null);

  useEffect(() => { setAddedUser(null) }, [nav]);

  const handleInput = e => {
    let value = e.target.value.replace(/^\s+/g, ''); // remove leading spaces

    let [searchedUsername, searchedTag] = value.split("#");
    searchedUsername = searchedUsername.slice(0, 32); // limits name to 32 characters

    searchedTag = searchedTag || "";
    searchedTag = searchedTag.replace(/[^0-9.]/g, '').slice(0, 4); // returns only the first four numbers
    setTag(value.includes("#") ? "0000".slice(searchedTag.length) : "#0000");

    e.target.value = (value.includes("#") ? `${searchedUsername}#${searchedTag}` : searchedUsername);
    setUsername((value.includes("#") ? `${searchedUsername}#${searchedTag}` : searchedUsername));

    if (searchedUsername.length && searchedTag && searchedTag.length === 4) {
      setDisabled(false);
    } else { setDisabled(true) };
  };

  const handleSubmit = e => {
    e.preventDefault();
    const [searchedUsername, searchedTag] = username.split("#");
    if (searchedUsername.length && searchedTag && searchedTag.length === 4) {
      const input = document.querySelector(".friends-nav-content > form > input");
      
      requestFriendship({ username: searchedUsername, tag: searchedTag })
      .then(friend => {
        input.value = "";
        input.style.outline = "1px solid #3BA55D";
        setAddedUser(friend);
      }, ({ errors }) => {
        const failedUser = errors.responseJSON[0].includes("yourself") ? errors.responseJSON : false;
        input.style.outline = "1px solid #ED4245";
        setAddedUser(failedUser);
      });

      setTimeout(() => {
        setAddedUser(null);
        input.style.outline = "";
      }, 3000);
    };
  };

  const navItems = [
    // "Online", 
    "All", "Pending", "Add Friend"].map(navType => (
    <button key={navType} onClick={() => setNav(navType)} className={nav === navType ? "selected" : ""}>
      {navType}
    </button>
  ));

  const friendsList = (type, options) => {
    return props[type].sort((a, b) => (a.username < b.username ? -1 : 1)).map(friend => (
      <div key={`friend-${friend.id}`} onClick={e => {
        const classes = e.target.classList
        if (options.message && !classes.contains("remove-friend")) createDm(friend.id);
      }} style={{ cursor: options.message ? "pointer" : null }}>
        <hr />
        <li className="friend">
          <img className="friend-profile" src={friend.profilePhotoUrl || window.logo} alt="profile" />
          <div className="friend-info">
            <p>{friend.username}<span>#{friend.tag}</span></p>
            <p>{options.info}</p>
          </div>
          <div className="friend-options">
            {options.message ?
              <div className="friend-option">
                <img className="open-message" src={window.message} alt="message" />
                <Bubble text={options.message} top="-38px" />
              </div>
              : null}
            {options.checkmark ?
              <div className="friend-option" onClick={() => acceptFriendship(friend.friendshipId)}>
                <img src={window.checkmark} alt="message" />
                <Bubble text={options.checkmark} top="-38px" />
              </div>
              : null}
            <div className="friend-option remove-friend" onClick={() => { options.xFun ? options.xFun(friend.friendshipId) :
              setDeleteFriendModal(friend)}}>
              <img className="remove-friend" src={window.xButton} alt="X" />
              <Bubble text={options.x} top="-38px" />
            </div>
          </div>
        </li>
      </div>
    ));
  };

  const renderList = () => {
    switch(nav) {
      // case "Online":
      //   return ( props.friends.length ?
      //     <>
      //       <h3>{`ONLINE FRIENDS — ${props.friends.length}`}</h3>
      //       {friendsList("friends", { info: "Online", message: "Message", x: "Unfriend" })}
      //     </> :
      //     <div id="wumpus">
      //       <img src={window.onlineWumpus} alt="wumpus" />
      //       <p>No one's around to play with Wumpus.</p>
      //     </div>
      //   );
      case "All":
        return (props.friends.length ?
          <>
            <h3>{`ALL FRIENDS — ${props.friends.length}`}</h3>
            {friendsList("friends", { info: "Friend", message: "Message", x: "Unfriend" })}
          </> :
          <div id="wumpus">
            <img src={window.allWumpus} alt="wumpus" />
            <p>Wumpus is waiting on friends. You don't have to though!</p>
            <button onClick={() => setNav("Add Friend")}>Add Friend</button>
          </div>
        );
      case "Pending":
        return (props.pendingFriends.length ?
          <>
            <h3>{`PENDING FRIEND REQUESTS — ${props.pendingFriends.length}`}</h3>
            {friendsList("pendingFriends", { info: "Outgoing Friend Request", x: "Cancel", xFun: deleteFriend })}
          </> :
          <div id="wumpus">
            <img src={window.pendingFriendsWumpus} alt="wumpus" />
            <p>There are no pending friend requests. Here's Wumpus for now.</p>
          </div>
        );
      case "Add Friend":
        return ( props.friendRequests.length ?
          <>
            <h3>{`INCOMING FRIEND REQUESTS — ${props.friendRequests.length}`}</h3>
            {friendsList("friendRequests", { info: "Incoming Friend Request", checkmark: "Accept", x: "Decline", xFun: deleteFriend })}
            </> :
          <div id="wumpus">
            <img src={window.friendRequestsWumpus} alt="wumpus" />
            <p>Wumpus is waiting on friends. You don't have to though!</p>
          </div>
        );
    }
  }

  return (
    <>
      <div id="friends-nav" className="home-content">
        <div className="header">
          <img src={window.friend} alt="friends" />
          <h3>Friends</h3>
          {navItems}
        </div>
      </div>
      { nav === "Add Friend" ?
        <div className="friends-nav-content" >
          <form onSubmit={handleSubmit} >
            <h2>ADD FRIEND</h2>
            <p>You can add a friend with their Accord Tag. It's cAsE sEnSitIvE!</p>
            <input type="text" autoFocus maxLength="37" placeholder="Enter a Username#0000" onChange={handleInput} />
            <button disabled={disabled}>Send Friend Request</button>
            <div id="placeholder">{`O${username}`}<span>{username.length ? tag : null}</span></div>
            {addedUser && !Array.isArray(addedUser) ? <p id="added-user">Success! Your friend request to <span>{addedUser.accordTag}</span> was sent.</p> : null}
            {Array.isArray(addedUser) ? <p id="failed-added-user">You cannot add yourself as a friend.</p> : null}
            {addedUser === false ? <p id="failed-added-user">Failed to add user. Check for pending invites or spelling errors.</p> : null}
            <hr />
          </form>
        </div>

        : null }
      
      <ul id="friends-index" style={nav === "Add Friend" ? { top: addedUser || addedUser === false ? "234px" : "209px" } : null}>
        {renderList()}
      </ul>

        {deleteFriendModal ?
          <DeleteFriendModal friend={deleteFriendModal} deleteFriend={deleteFriend} closeModal={() => setDeleteFriendModal(null)}
          />
        : null}
    </>
  );
};

export default FriendsNav;