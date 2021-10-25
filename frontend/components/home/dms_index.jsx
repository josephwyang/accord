import React, { useState, useEffect } from "react";
import FriendsNavContainer from "./friends_nav_container";
import { Link, NavLink } from "react-router-dom";
import MessageFormContainer from "../messages/message_form_container";
import Bubble from "../misc/bubble";
import MembersIndexContainer from "../users/members_index_container";
import CreateDmForm from "./create_dm_form";

const DmsIndex = ({ dms, friends, currentUser, deleteServer, postServer, postMembership, ...props }) => {
  const [dm, setDm] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [creatingDm, setCreatingDm] = useState(false);

  useEffect(() => {
    setDm(dms[props.match.params.dmId]);
  }, [dms]);

  useEffect(() => {
    if(props.location.pathname === "/@me") setDm(null);
  }, [props.location.pathname])

  const dmsList = Object.values(dms).sort((a, b) => (a.lastMessage > b.lastMessage ? -1 : 1)).map(dm => (
    <NavLink key={dm.id} to={`/@me/${dm.id}`} activeClassName="selected" onClick={e => {if(e.target.classList[0] != "delete-dm") setDm(dm)}}>
      {dm.user ?
        <img src={dm.user.profilePhotoUrl || window.logo} alt="profile" /> :
        <div><img src={dm.icon || window.group} alt="profile" /></div> }
      <p>{dm.name || dm.user.username}</p>
      <img className="delete-dm" src={window.xButton} alt="X" onClick={e => {e.preventDefault(); setDeleting(dm);}} />
    </NavLink>
  ));

  const createDm = friendId => {
    for (let dm of Object.values(dms)) {
      if (dm.user && dm.user.id === friendId) {
        const id = dm.id;
        props.history.push(`/@me/${id}`);
        setDm(dm);
        return;
      }
    }

    const formData = new FormData();
    formData.append('server[name]', "dm");
    formData.append('server[public]', false);
    formData.append('server[genre]', "dm");
    formData.append('server[ownerId]', friendId);

    postServer(formData).then(({payload}) => {
      props.history.push(`/@me/${payload.server.id}`);
      setDm(payload.server);
    });
  };

  const handleDelete = () => {
    deleteServer(deleting.id);
    setDeleting(null);
    props.history.push("/@me");
  }

  return (
    <>
      <div id="dm">
        <div id="dms-index" className="nav">
          <div className="header">
            <input type="text" placeholder="Find or start a conversation" />
          </div>
            <ul>
              <Link to="/@me" className={props.location.pathname === "/@me" ? "dm-nav selected" : "dm-nav"}>
                <img src={window.friend} alt="friends" />
                <p>Friends</p>
              </Link>
              <div>
                <h3>DIRECT MESSAGES</h3>
                <div onClick={() => setCreatingDm(true)}>
                  +
                  <Bubble text="Create DM" top="-38px" />
                </div>
              </div>
              {dmsList}
            </ul>
        </div>
        
        { dm ?
          <>
            <div id="channel-header">
              <img src={window.group} alt="@" />
              <h3 style={{ marginLeft:"3px" }}>{dm.name || dm.user.username}</h3>
            </div>
            <div id="dm-messages" className={dm.name ? "gc" : ""}>
              <MessageFormContainer dm={dm} scrolled={scrolled} setScrolled={setScrolled} />
            </div>
            {dm.name ? <MembersIndexContainer ownerId={dm.ownerId} /> : null}
          </>
          : <FriendsNavContainer setDm={setDm} createDm={createDm} /> }
      </div>

      {deleting ? <div className="delete-server-modal">
        <div className="modal-screen" onClick={() => setDeleting(null)}></div>
        <div className="settings-modal">
          <div className="settings-modal-message">
            <h1>Delete {dm.name ? <span style={{ fontWeight: 900 }}>{dm.name}</span> : "direct message"}?</h1>
            <p>Are you sure you want to delete {dm.name ? "" : "your conversation with "}<span>{dm.name || dm.user.username}</span>? This action cannot be undone.</p>
          </div>
          <div className="form-nav">
            <p onClick={() => setDeleting(null)}>Cancel</p>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div> : null}

      {creatingDm ? <CreateDmForm friends={friends} createDm={createDm} closeForm={() => setCreatingDm(false)} /> : null}
    </>
  );
};

export default DmsIndex;