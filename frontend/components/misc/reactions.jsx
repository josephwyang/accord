import React, { useEffect, useState, useRef } from "react";

const Reactions = ({ messageId, top, right, closeForm, currentUserId, postReaction }) => {
  const [search, setSearch] = useState("");
  const [hoveredReaction, setHoveredReaction] = useState("smile");

  const containerRef = useRef(null);
  const reactions = ["smile", "happy", "joy", "wink", "oops", "frown", "cry", "sob", "sweat", "ouch", "smirk", "unamused", "annoyed", "confused", "dizzy", "angry", "poisoned", "angel", "devil", "rainbow", "kissing", "kissHeart", "inLove", "blushing", "mute", "cool", "starstruck", "tongue", "rollingEyes", "scared", "sleeping", "simp", "sakura", "pinkHeart", "redHeart", "brownHeart", "yellowHeart", "mintHeart", "lavenderHeart", "purpleHeart"];

  useEffect(() => {
    const handleOutsideClick = e => { if (containerRef.current && !containerRef.current.contains(e.target)) closeForm(); }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [containerRef]);

  const react = reaction => {
    postReaction({
      messageId,
      reactorId: currentUserId,
      emoji: reaction
    });
    closeForm();
  };

  const reactionIcons = reactions.filter(reaction => reaction.toLowerCase().includes(search.toLowerCase())).map((reaction, i) => (
    <li key={`reaction-${i}`} onMouseEnter={() => setHoveredReaction(reaction)} onClick={() => react(reaction)}>
      <img className="reaction" src={window[reaction]} alt={`reaction-${i}`} />
    </li>
  ));

  return (
    <div id="reactions" ref={containerRef} style={{ top: `min(${document.getElementById("app").getBoundingClientRect().height - 483}px, ${top}px)`, right }} >
      <div className="header">
        <input placeholder="Add a Reaction" value={search} onChange={e => {
          setSearch(e.target.value);
          const firstReaction = reactions.filter(reaction => reaction.includes(e.target.value))[0];
          if (firstReaction) setHoveredReaction(firstReaction);
        }} autoFocus />
      </div>
      <ul id="reactions-index">
        {reactionIcons.length ? reactionIcons :
        <div id="no-reaction-match">
          <img src={window.noReactionMatch} alt="no-match" />
          <p>No emojis match your search</p>
        </div>
        }
      </ul>
      <div id="hovered-reaction">
        <img src={window[hoveredReaction]} alt={hoveredReaction} />
        <p>{hoveredReaction.replace(/([A-Z])/g, " $1").toLowerCase()}</p>
      </div>
    </div>
  )
};

export default Reactions;