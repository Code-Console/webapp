import Link from "next/link";
import React from "react";
import { FaBars, FaHome, FaNapster, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AnimType } from "../../../interfaces";
import { actionAnimType } from "../../../redux/action";
import { mobileBreakPoint } from "../../Assets";
import { useAnimType } from "../../hooks";

const Menu = () => {
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const animationType = useAnimType();
  const menuItems = [
    {
      title: "Space dust",
      type: AnimType.SPACE_DUST,
    },
    {
      title: "Text Dust Anim",
      type: AnimType.TEXT_DUST_ANIM,
    },
    {
      title: "Displacement shader",
      type: AnimType.DISPLACEMENT_SHADER,
    },
    {
      title: "Toy shader",
      type: AnimType.TOY_SHADER,
    },
    {
      title: "Makers fund",
      type: AnimType.MAKERS_FUND,
    },
  ];
  const onClickMenu = (animType: AnimType) => {
    dispatch(actionAnimType(animType));
    setTimeout(() => setShow(false), 300);
  };
  return (
    <>
      <button className="menu-nav btn" onClick={() => setShow(!show)}>
        {show ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`nav-container ${show ? "show" : ""}`}>
        <div className="nav-btn btn btn-visit-loft">
          <Link href="/" style={{ width: "100%" }}>
            <div>
              <FaHome />
              <span className="nav-text">Home</span>
            </div>
          </Link>
        </div>
        {menuItems.map((item) => (
          <div
            onClick={() => onClickMenu(item.type)}
            className="nav-btn btn btn-visit-loft"
            key={item.type}
          >
            <div
              className={`${item.type === animationType ? "menu-select" : ""}`}
            >
              <FaNapster />
              <span className="nav-text">{item.title} </span>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .menu-nav {
          font-size: 22px;
          left: auto;
          right: 0;
          margin: 5px 5px 0 0;
          position: fixed;
          padding-top: 6px;
        }
        .nav-btn .menu-select {
          color: GREEN;
          font-weight: 900;
        }
        :global(.touch) .menu-nav {
          font-size: 40px;
        }

        :global(.ssp) .menu-nav {
          font-size: 50px;
          line-height: 40px;
        }
        .nav-close {
          display: block;
          float: right;
          margin-top: 6px;
          background: transparent;
          color: #666;
        }
        .nav-close :global(svg) {
          width: 40px;
          height: auto;
        }

        .nav-container {
          position: fixed;
          right: -300px;
          left: auto;
          top: 50px;
          bottom: 0;
          text-align: left;
          width: 250px;
          z-index: 41;
          overflow-y: auto;
          color: #fff;
          opacity: 0;
          transition: all 0.2s ease-in-out;
          color: #fff;
        }

        .nav-btn {
          display: block;
          color: #fff;
          text-align: left;
          padding: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          width: 100%;
          border-radius: 0;
          display: flex;
          background: rgba(0, 0, 0, 0.8);
          justify-content: space-between;
        }
        :global(.touch) .nav-btn {
          padding: 20px 15px;
        }
        :global(.ssp) .nav-btn {
          padding: 30px 20px;
          font-size: 1.4em;
        }
        .nav-btn :global(svg) {
          width: 20px;
          height: auto;
        }
        :global(.ssp) .nav-btn :global(svg) {
          width: 40px;
          height: auto;
        }
        .nav-btn:hover {
          background: #000;
        }

        .nav-container.show {
          transform: translateX(-300px);
          opacity: 1;
        }

        :global(.ssp) .nav-container.show {
          transform: translateX(-600px);
        }

        .nav-backdrop {
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        .btn-hub-library :global(svg) {
          width: 25px;
          height: auto;
          margin-right: -3px;
        }
        .nav-text {
          margin-left: 15px;
        }
        @media (min-width: ${mobileBreakPoint}px) {
          .nav-container {
            top: 70px;
          }
        }
      `}</style>
    </>
  );
};

export default Menu;
