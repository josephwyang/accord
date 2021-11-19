import React, { useEffect, useState, useRef } from "react";
import ChannelsIndex from "../channels/channels_index";
import ChannelContainer from "../channels/channel_container";
import MembersIndexContainer from "../users/members_index_container";

import ServerInviteModalContainer from "./server_invite_modal_container";
import ServerSettingsContainer from "./server_settings_container"
import ChannelFormContainer from "../channels/channel_form_container";
import LeaveServerModal from "./leave_server_modal";
import SendInvitation from "./send_invitation";
import PassOwnerModal from "./pass_owner_modal";

const Server = ({ servers, publicServers, server, getServer, previewServer, channels, currentChannel, currentUser, firstChannelId, createDm, postMessage, postMembership, deleteMembership, setContext,
  serverInviteOpen, setServerInviteOpen, serverSettingsOpen, setServerSettingsOpen, channelFormOpen, setChannelFormOpen, leaveServerModalOpen, setLeaveServerModalOpen, deleteFriend, setDeleteFriend, ...props }) => {
  const [headerOpen, setHeaderOpen] = useState({ serverHeader: false, channelHeader: true });
  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState(null);
  const [inviteChannel, setInviteChannel] = useState(null);
  const [passOwner, setPassOwner] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = e => {
      if (containerRef.current && !containerRef.current.contains(e.target) && e.target.id !== "server-header"
      && !Array.from(document.querySelectorAll("#server-header > *")).includes(e.target))
        setHeaderOpen(Object.assign({}, headerOpen, { serverHeader: false }));
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [containerRef]);

  const loadServer = () => {
    const getCorrectServer = (Object.keys(servers).includes(props.match.params.serverId) ? getServer : previewServer);
    getCorrectServer().then(({ payload }) => {
      const serverUrl = `/channels/${payload.server.id}/${currentChannel && Object.keys(payload.channels).includes(currentChannel.id.toString()) ? currentChannel.id : (firstChannelId(payload.channels))}`;
      if (!payload.server.public && !Object.keys(servers).includes(payload.server.id.toString())) {
        debugger
        props.history.push("/@me");
        props.removePreview();
      } else if (props.location.pathname !== serverUrl) props.history.push(serverUrl);
    }).then(() => document.getElementById("messages-end").scrollIntoView({ behavior: "instant" }));
    setLoading(false);
  };

  useEffect(() => {
    const historyState = props.history.location.state;
    if (historyState) setInvitation(historyState.invitation);
  }, [props.history.location.state]);

  useEffect(() => { 
    if (loading && !props.serversLoading) loadServer();
  });

  const toggleOpen = field => setHeaderOpen(Object.assign({}, headerOpen, { [field]: !headerOpen[field] }));

  const inviteChannels = () => channels.map(channel => (
    <li key={channel.id} className={inviteChannel === channel.id ? "selected" : ""} onClick={() => setInviteChannel(channel.id)}>
      <img src={window.hashtag} alt="#" />
      {channel.name}
    </li>
  ));

  if (!server) { return null; }
  return ( <>
    {invitation ?
      <SendInvitation inviteChannel={inviteChannel} server={servers[invitation]} serverId={server.id} channels={inviteChannels}
      currentUserId={currentUser.id} postMessage={postMessage} closeModal={() => { setInvitation(null); setInviteChannel(null); }} history={props.history} /> : null}

    <div id="server">
      <div id="channel-header">
        <img src={window.hashtag} alt="#" />
        <h3>{currentChannel ? currentChannel.name : null}</h3>
      </div>
      <ChannelsIndex toggleOpen={toggleOpen} openChannelForm={editing => setChannelFormOpen(editing || true)} setContext={setContext}
        serverHeaderOpen={headerOpen.serverHeader} channelHeaderOpen={headerOpen.channelHeader} isPreview={!Object.keys(servers).includes(props.match.params.serverId)}
        server={server} channels={channels} channelId={props.match.params.channelId} />
      {headerOpen.serverHeader ? (
        <ul id="server-header-modal" ref={containerRef}>
          <li onClick={() => {
            setServerInviteOpen(true);
            setHeaderOpen(Object.assign({}, headerOpen, { serverHeader: false }));
          }}>
            Invite People
            <img src={window.invite} alt="invite" />
          </li>
          {server.ownerId === currentUser.id ? (
          <li onClick={() => {
            setServerSettingsOpen(true);
            setHeaderOpen(Object.assign({}, headerOpen, { serverHeader: false }));
          }}>
            Server Settings
            <img src={window.cog} alt="cog" />
          </li>
          ) : null}
          <li onClick={() => {
            setChannelFormOpen(true);
            setHeaderOpen(Object.assign({}, headerOpen, { serverHeader: false }));
          }}>
            Create Channel
            <img src={window.create} alt="create" />
          </li>
          <li onClick={() => {
            setLeaveServerModalOpen(true);
            setHeaderOpen(Object.assign({}, headerOpen, { serverHeader: false }));
          }}>
            Leave Server
            <img src={window.leave} alt="leave" />
          </li>
        </ul>
      ) : null }

      {serverSettingsOpen ? (
        <ServerSettingsContainer currentUserId={currentUser.id} deleteMembership={deleteMembership} closeSettings={() => setServerSettingsOpen(false)}
          passOwner={passOwner} setPassOwner={setPassOwner} />
      ) : null}
      {channelFormOpen ? (
        <ChannelFormContainer closeForm={() => setChannelFormOpen(false)} editing={typeof channelFormOpen === "boolean" ? false : channelFormOpen}/>
      ) : null}
      <ChannelContainer showBlanks={props.showBlanks} setShowBlanks={props.setShowBlanks}/>
    </div>

    {serverInviteOpen ? (
      <ServerInviteModalContainer servers={servers} server={server} currentUserId={currentUser.id} closeModal={() => setServerInviteOpen(false)} />
    ) : null}
    {leaveServerModalOpen ?
      <LeaveServerModal server={server} currentUserId={currentUser.id} isOwner={server.ownerId === currentUser.id}
        deleteMembership={deleteMembership} closeModal={() => setLeaveServerModalOpen(false)} history={props.history}
      /> : null}
    {passOwner ?
      <PassOwnerModal member={passOwner} owner={currentUser} server={server} closeModal={() => setPassOwner(null)}
        passOwner={() => {
          const formData = new FormData();
          formData.append('server[id]', server.id);
          formData.append('server[ownerId]', passOwner.id);
          props.patchServer(formData);
          setServerSettingsOpen(false);
        }} /> : null}

    <MembersIndexContainer createDm={createDm} ownerId={server.ownerId} setContext={setContext} setPassOwner={setPassOwner} deleteFriend={deleteFriend} setDeleteFriend={setDeleteFriend} />
    {server.id && !Object.keys(servers).includes(props.match.params.serverId) ? (
      <div id="join-preview">
        <p>You are current in preview mode. Join this server to start chatting!</p>
        <button onClick={() => postMembership({ userId: currentUser.id, serverId: server.id, description: "server" })}>{`Join ${server.name}`}</button>
      </div>
    ) : null}
  </>
)};

export default Server;