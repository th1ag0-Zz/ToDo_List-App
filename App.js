import React from "react";
import { StatusBar } from "react-native";
import Home from "./src/pages/Home";

function App() {
  return (
    <>
      <StatusBar backgroundColor="#121014" barStyle="light-content" />
      <Home />
    </>
  );
}

export default App;
