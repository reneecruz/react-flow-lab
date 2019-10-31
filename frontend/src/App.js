import React, { Component, Fragment } from "react";
import "./Stylesheets/style.scss";
import ShowPanel from './Components/ShowPanel';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';


export default class App extends Component {

  state = {
    people: [],
    person: {},
    name: '',
    bio: '',
    img: ''
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
      person: person,
      name: person.name,
      bio: person.bio,
      img:person.img_url
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log("submit")
    fetch("http://localhost:3000/people", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        bio: this.state.bio,
        img_url: this.state.img
      })
    })
    .then(res => res.json())
    .then(personObject => {
      this.setState({
        people: [personObject, ...this.state.people],
        person: personObject
      })
    })
    .then(
      this.setState({
        name: '',
        img: '',
        bio: ''
      })
    )

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

    return <Fragment>
      <Topbar
        name={this.state.name}
        bio={this.state.bio}
        img={this.state.img}
        person={this.state.person}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
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
