import React, { useState, useEffect } from "react";
import FriendsNavContainer from "./friends_nav_container";
import { Link, NavLink } from "react-router-dom";
import MessageFormContainer from "../messages/message_form_container";
import Bubble from "../misc/bubble";
import MembersIndexContainer from "../users/members_index_container";
import CreateDmForm from "./create_dm_form";
import DeleteDmModal from "./delete_dm_modal";
import SearchDm from "./search_dm";
import ChangeGcIcon from "./change_gc_icon";
import EditingGcName from "./editing_gc_name";

const DmsIndex = ({ dms, servers, dm, setDm, createDm, friends, pendingFriends, friendRequests, currentUser, deleteServer, postMessage, setContext, deleteFriend, setDeleteFriend, ...props }) => {
  const [scrolled, setScrolled] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [creatingDm, setCreatingDm] = useState(false);
  const [searchingDm, setSearchingDm] = useState(false);
  const [changingIcon, setChangingIcon] = useState(null);
  const [hoveredCreateDm, setHoveredCreateDm] = useState(false);
  const [editingGc, setEditingGc] = useState(null);

  useEffect(() => {
    setDm(dms[props.match.params.dmId]);
  }, [dms]);

  const friendInfo = member => {
    let friend;
    friends.forEach(checkedFriend => checkedFriend.id == member.id ? friend = checkedFriend : null);
    if (friend) return { text: "Remove Friend", color: "red", function: () => setDeleteFriend(friend) };

    pendingFriends.forEach(checkedFriend => checkedFriend.id == member.id ? friend = checkedFriend : null);
    if (friend) return { text: "Cancel Friend Request", color: "red", function: () => props.deleteFriendFunc(friend.friendshipId) };

    friendRequests.forEach(checkedFriend => checkedFriend.id == member.id ? friend = checkedFriend : null);
    if (friend) return { text: "Accept Friend Request", color: "blue", function: () => props.acceptFriendship(friend.friendshipId) };

    return { text: "Add Friend", color: "blue", function: () => props.requestFriendship({ username: member.username, tag: member.tag }) };
  };

  const contextOptions = dm => [
    { text: "Invite to Server", icon: window.arrow, dropdown: servers, dropdownFn: serverId => {
      const dmUrl = `/@me/${dm.id}`;
      if(props.history.location.pathname !== dmUrl) props.history.push(dmUrl);
      postMessage({
        senderId: currentUser.id,
        channelId: dm.channelId,
        body: "INVITATION",
        invitation: serverId
      });
    }},
    dm.user ? friendInfo(dm.user) :
    { text: "Change Icon", function: () => setChangingIcon(dm) },
    { text: "BREAK" },
    { text: "Delete Chat", color: "red", function: () => setDeleting(dm) }
  ];

  useEffect(() => {
    if(props.location.pathname === "/@me") {
      setDm(null);
    } else setDm(dms[props.match.params.dmId]);
  }, [props.location.pathname])

  const dmsList = Object.values(dms).sort((a, b) => (a.lastMessage > b.lastMessage ? -1 : 1)).map(dm => (
    <NavLink key={dm.id} to={`/@me/${dm.id}`} activeClassName="selected" onClick={e => { if(e.target.classList[0] != "delete-dm") setDm(dm) }}
      onContextMenu={e => setContext(e, contextOptions(dm))}>
      {dm.user ?
        <img src={dm.user.profilePhotoUrl || window.logo} alt="profile" /> :
        dm.icon ? <img src={dm.icon} alt="profile" />
        : <div><img src={window.group} alt="profile" /></div> }
      <p className="ellipsis">{dm.name || dm.user.username}</p>
      <img className="delete-dm" src={window.xButton} alt="X" onClick={e => {e.preventDefault(); setDeleting(dm);}} />
    </NavLink>
  ));

  const handleDelete = () => {
    deleteServer(deleting.id);
    setDeleting(null);
    if(props.history.location.pathname !== "/@me") props.history.push("/@me");
  }

  return (
    <>
      <div id="dm">
        <div id="dms-index" className="nav">
          <div className="header">
            <div id="dm-search" onClick={() => setSearchingDm(true)}>Find or start a conversation</div>
          </div>
          <ul>
            <Link to="/@me" className={props.location.pathname === "/@me" ? "dm-nav selected" : "dm-nav"} onClick={props.removeCurrentChannel}>
              <img src={window.friend} alt="friends" />
              <p>Friends</p>
            </Link>
            <div>
              <h3>DIRECT MESSAGES</h3>
              <div onClick={() => setCreatingDm(true)} onMouseEnter={() => setHoveredCreateDm(true)}
                onMouseLeave={() => setHoveredCreateDm(false)}>+</div>
            </div>
            {dmsList}
          </ul>
        </div>
        
        { dm ?
          <>
            <div id="channel-header" className={dm.user ? "" : "gc"}>
              <img src={window.group} alt="@" />
              {editingGc ?
              <EditingGcName gc={dm} patchServer={props.patchServer} closeForm={() => setEditingGc(null)} />
              : <h3 className="ellipsis" onClick={() => {dm.name ? setEditingGc(dm) : null}}>{dm.name || dm.user.username}</h3>}
            </div>
            <div id="dm-messages" className={dm.name ? "gc" : ""}>
              <MessageFormContainer dm={dm} scrolled={scrolled} setScrolled={setScrolled} showBlanks={props.showBlanks} setShowBlanks={props.setShowBlanks} />
            </div>
            {dm.name ? <MembersIndexContainer showBlanks={props.showBlanks} createDm={createDm} ownerId={dm.ownerId} gc={true} setContext={setContext} deleteFriend={deleteFriend} setDeleteFriend={setDeleteFriend} /> : null}
          </>
          : <FriendsNavContainer createDm={createDm} /> }
      </div>

      {deleting ? <DeleteDmModal deleting={deleting} handleDelete={handleDelete} closeModal={() => setDeleting(null)} /> : null}
      {creatingDm ? <CreateDmForm friends={friends} currentUser={currentUser} createDm={createDm} closeForm={() => setCreatingDm(false)} /> : null}
      {searchingDm ? <SearchDm dms={dms} friends={friends} createDm={createDm} closeForm={() => setSearchingDm(false)} /> : null}
      {changingIcon ? <ChangeGcIcon gc={changingIcon} patchServer={props.patchServer} closeModal={() => setChangingIcon(null)} /> : null}
      <Bubble text="Create DM" top="91px" forceX="277.45px" show={hoveredCreateDm} />
    </>
  );
};

export default DmsIndex;