import React, { useState, useEffect } from "react";

const ChangeGcIcon = ({ gc, patchServer, closeModal }) => {
  const [icon, setIcon] = useState(null);
  const [iconUrl, setIconUrl] = useState(gc.icon || "");

  const handleEsc = e => { if (e.key === "Escape") closeModal(); };
  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleIconFile = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setIcon(file);
      setIconUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setIcon(null);
      setIconUrl("");
    }
  };

  const handleSubmit = () => {
    closeModal();
    const formData = new FormData();
    formData.append('server[id]', gc.id);
    formData.append('server[icon]', icon);
    patchServer(formData);
  }

  return (
    <div id="change-gc-icon">
      <div className="modal-screen" onClick={closeModal}></div>
      <div className="settings-modal">
        <div className="settings-modal-message">
          <h3>Change '{gc.name}' Icon</h3>
          {iconUrl === "" ? <div><img src={window.group} alt="gc" /></div> : <img src={iconUrl} alt="icon" />}
          <label htmlFor="gc-icon">
            <div className="file-input-icon"><img src={window.camera} alt="camera" /></div>
            <p>CHANGE ICON</p>
            </label>
          <input id="gc-icon" accept="image/*" type="file" onChange={handleIconFile} />
        </div>
        <div className="form-nav">
          <p onClick={closeModal}>Cancel</p>
          <button disabled={!icon} onClick={handleSubmit}>Save Icon</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeGcIcon;