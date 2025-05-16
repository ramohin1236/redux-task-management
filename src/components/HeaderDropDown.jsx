import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/react.svg";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { Switch } from "@headlessui/react";
import boardsSlice from "../redux/boardsSlice";
import useDarkMode from "../hooks/useDarkMode.js"


function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }) {
  const dispatch = useDispatch()
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "dark" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className=" bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          ALL BOARDS ({boards?.length})
        </h3>

        <div className=" dropdown-borad  ">
          {boards.map((board, index) => (
            <div
              className={` flex items-baseline space-x-2 px-5 py-4  ${
                board.isActive &&
                " bg-[#635fc7] rounded-r-full text-white mr-8 "
              } `}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <img src={boardIcon} className="  filter-white  h-4 " />{" "}
              <p className=" text-lg font-bold  ">{board.name}</p>
            </div>
          ))}

          <div 
          onClick={() => {
            setIsBoardModalOpen(true);
            setOpenDropdown(false)
          }}
          className=" flex items-baseline space-x-2  text-[#635fc7] px-5 py-4  ">
            <img src={boardIcon} className="   filter-white  h-4 " />
            <p className=" text-lg font-bold  ">Create New Task </p>
          </div>

          <div className=" mx-2  p-4  space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
          <MdLightMode className="h-6 w-6 text-yellow-500" />

            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>

            <MdDarkMode className="h-6 w-6 text-gray-600 dark:text-white" />
            </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;