import Center from "./components/Center"
import Header from "./components/Header"
import logo from './assets/react.svg'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import boardsSlice from "./redux/boardsSlice";
import Home from "./Pages/Home";

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <>
        {boards.length > 0 ?
        <>
        <Header
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
        />
        <Home
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
        />
        </>
        :
        <>
          <EmptyBoard type='add'/>
        </>
      }
        
      </>
    </div>
  );
}

export default App
