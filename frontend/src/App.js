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

  handleDelete = (id) => {
    console.log("delete button clicked, heyy", id)
    fetch(`http://localhost:3000/people/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => {
      const newPeople = this.state.people.filter(person => person.id !== id)
      this.setState({
        people: newPeople,
        person: {}
      })
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
    <ShowPanel
      person={this.state.person}
      handleDelete={this.handleDelete}
    />
    </Fragment>;
  }
}
