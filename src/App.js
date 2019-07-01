import React from "react";
import { Layout } from "antd";
import CollectionsPage from "./components/CollectionsPage";
import "./App.css";

const { Header, Footer, Content } = Layout;
function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="portal-header">
          <h2>Citi</h2>
        </Header>
        <Content className="portal-content">
          <CollectionsPage />
        </Content>
        <Footer className="portal-footer">
          <p>Made with in China.</p>
          <p>2019 CSTC Co. All rights reserved.</p>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
