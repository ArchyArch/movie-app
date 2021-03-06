import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import BasicTiles from "./components/BasicTiles";
import SelectedMovie from "./components/SelectedMovie";
import UsersAndSeats from "./components/UsersAndSeats";

class App extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: ""
  };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={BasicTiles} />
          <Route path="/selected/:movie_id/" component={SelectedMovie} />
          <Route path="/:movie_id/cinema" component={UsersAndSeats} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
