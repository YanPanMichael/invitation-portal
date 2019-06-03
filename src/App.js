import React from "react";
import { Layout } from "antd";
import CollectionsPage from "./components/Dialog";
import "./App.css";

const { Header, Footer, Content } = Layout;
function App() {
  return (
    <div className="App">
      <Layout>
        <Header>Header</Header>
        <Content>
          <CollectionsPage />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
