import React, { useState, useEffect, useRef, useCallback } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import dummy from "../../db/dummy.json";
import getPreventScrolling from "../../util/getPreventScrolling";
// import getGSAPtimelineLeft from "../../util/getGSAPtimelineLeft";
function SideBarMenu() {
  const sideBarRef: any = useRef();
  //   const tl = useRef();
  const [menu, setMenu] = useState(dummy.dummy);
  const onSubClick = useCallback(
    (id: number) => {
      const subMenuToggle = menu.map((item) =>
        item.id === id ? { ...item, isOpened: !item.isOpened } : item
      );
      setMenu(subMenuToggle);
    },
    [menu]
  );
  useEffect(() => {
    getPreventScrolling();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  //   useEffect(() => {
  //     getGSAPtimelineLeft(tl, sideBarRef);
  //   }, []);
  //   useEffect(() => {
  //     onToggle ? tl.current.play() : tl.current.reverse();
  //   }, [onToggle]);

  return (
    <div className="SideBarTotalBox" ref={sideBarRef}>
      {menu.map((item) => (
        <div key={item.id} className="SideBarTextBox">
          <div
            className="cursorPointer flex-vertical-center SideBarTextBlock"
            onClick={() => onSubClick(item.id)}
          >
            {item.title}
            {Boolean(item.subMenu.length) &&
              (item.isOpened ? (
                <AiFillCaretUp
                  className="SideBarIconStyle cursorPointer"
                  onClick={() => onSubClick(item.id)}
                />
              ) : (
                <AiFillCaretDown
                  className="SideBarIconStyle cursorPointer"
                  onClick={() => onSubClick(item.id)}
                />
              ))}
          </div>
          <div className="displayBlock">
            {item.isOpened &&
              item.subMenu.map((content) => (
                <div key={content.id} className="SideBarClickedBox">
                  <div>
                    <span className="SideBarClickedText cursorPointer">
                      {content.title}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(SideBarMenu);
