import React, { useState, useEffect, useRef } from "react";

const ContextMenu = ({ options, top, left, closeMenu }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [dropdown, setDropdown] = useState(null);
  const [dropdownFn, setDropdownFn] = useState(null);
  const [dropdownYOffset, setDropdownYOffset] = useState(0);
  const [dropdownOpacity, setDropdownOpacity] = useState(0);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  const resize = () => {
    setX(Math.min(Math.max(800, window.innerWidth) - document.getElementById("context-menu").getBoundingClientRect().width - 10, left));
    setY(Math.min(window.innerHeight - document.getElementById("context-menu").getBoundingClientRect().height - 10, top));
  };

  useEffect(() => {
    const handleOutsideClick = e => { if (containerRef.current && !containerRef.current.contains(e.target)) {
      if (!dropdownRef.current) closeMenu();
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) closeMenu();
    }};
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("resize", resize)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const dropdown = document.getElementById("context-dropdown");
    if(!dropdown) {
      setDropdownOpacity(0);
      return
    };

    const offsetY = window.innerHeight - (dropdown.getBoundingClientRect().y + dropdown.getBoundingClientRect().height) - 10;
    if (offsetY < 0) setDropdownYOffset(offsetY);
    setDropdownOpacity(1);
  }, [dropdown]);

  const menu = options.map((option, i) => (
    option.text === "BREAK" ? <hr key={`option-${i}`} />
    : <li key={`option-${i}`}
    className={
      option.disabled ? "disabled" : dropdown && dropdown === option.dropdown ? "hovered " + option.color : option.color
    } onClick={ option.function ? () => {
        option.function();
        closeMenu();
      } : null }
    onMouseEnter={() => {
        if (option.dropdown) {
          if (dropdown === option.dropdown) return;
          setDropdownFn({fn: option.dropdownFn});
          setDropdown(option.dropdown);
        } else if (dropdown) {
          setDropdownFn(null);
          setDropdown(null);
        }}}>
      {option.text}
      {option.dropdown ? <img src={window.arrow} alt=">" /> : null}
    </li>
  ));

  useEffect(() => resize(), [options]);

  return (
    <>
      <ul id="context-menu" ref={containerRef} style={{ top: `${y}px`, left: `${x}px` }}>
        {menu}
      </ul>

      {dropdown ?
        <ul id="context-dropdown" ref={dropdownRef} style={{ top: `${y + dropdownYOffset}px`, left: `${x + 180}px`, opacity: dropdownOpacity }}>
          {dropdown.map(dropdownItem => (
            <li key={`dropdown-${dropdownItem.id}`} className="ellipsis" onClick={() => {
              dropdownFn.fn(dropdownItem.id);
              closeMenu();
            }}>
              {dropdownItem.name}
            </li>
          ))}
        </ul>
      : null}
    </>
  );
};

export default ContextMenu;