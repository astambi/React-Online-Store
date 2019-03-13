import React, { Component } from "react";
import AppRouter from "./components/AppRouter";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <AppRouter />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
