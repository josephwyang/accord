import React, { useEffect, useState, useRef } from "react";

const EditingGcName = ({ gc, patchServer, closeForm }) => {
  const [name, setName] = useState(gc.name);
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleEsc = e => { if (e.key === "Escape") closeForm(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleOutsideClick = e => { if (containerRef.current && !containerRef.current.contains(e.target)) closeForm(); }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [containerRef]);

  useEffect(() => setWidth(document.getElementById("editing-gc-placeholder").getBoundingClientRect().width), [name]);
  
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('server[id]', gc.id);
    formData.append('server[name]', name);
    patchServer(formData);
    closeForm();
  };

  return (
    <>
      <form id="editing-gc-name" onSubmit={handleSubmit} ref={containerRef} >
        <input type="text" value={name} style={{ width }} onChange={e => setName(e.target.value)} autoFocus/>
      </form>
      <p id="editing-gc-placeholder">{name}</p>
    </>
  );
};

export default EditingGcName;