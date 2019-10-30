import React, { Component, Fragment } from "react";
import "./Stylesheets/style.scss";
import ShowPanel from './Components/ShowPanel';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';


export default class App extends Component {

  state = {
    people: [],
    person: {}
  }

  componentDidMount(){
    fetch("http://localhost:3000/people")
    .then(res => res.json())
    .then(peopleObj => {
      this.setState({
        people: peopleObj
      })
    })
  }

  handleClick = (person) => {
    this.setState({
      person: person
    })
  }

  render() {
    // console.log(this.state.people)
    return <Fragment>
      <Topbar person={this.state.person}/>
      <Sidebar
        people={this.state.people}
        handleClick={this.handleClick}
      />
    <ShowPanel person={this.state.person}/>
    </Fragment>;
  }
}
