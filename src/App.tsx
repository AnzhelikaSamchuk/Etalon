import React from "react";
import { Layout, MainPage } from "./pages";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Layout>
        <MainPage />
      </Layout>
    </div>
  );
}

export default App;
