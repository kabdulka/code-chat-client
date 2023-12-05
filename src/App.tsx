// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/chat/chat";

const App: React.FC = () => {
  
  return  (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/chat"  element={ <Chat /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
