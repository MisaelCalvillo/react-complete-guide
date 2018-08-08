import React, { Component } from 'react';
import Classes from './App.css';
import Persons from './../components/Persons/Persons';
import Cockpit from './../components/Cockpit/Cockpit';

class App extends Component {

  constructor(props){
    super(props);
    console.log('[App.js] Inside Constructor ', props);
    this.state = {
      persons: [
        { id: 'sfasf', name: 'Max', age: 28 },
        { id: 'dfgsd', name: 'Manu', age: 29 },
        { id: 'rejje', name: 'Stephanie', age: 26 },
      ],
      showPersons: false
    }
  }

  componentWillMount(){
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount(){
    console.log('[App.js] Inside componentDidMount()');
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({ persons });
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {...this.state.persons[personIndex]};
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons });  
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    })
  }

  render() {
    console.log('[App.js] Inside Render')
    let persons = null;

    if (this.state.showPersons) {
      persons = (
         <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangeHandler}
         />
      );
    }



    return (
        <div className={Classes.App}>
          <Cockpit 
            appTitle={this.props.title}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
          />
          {persons}
        </div>
    );  
  }
}

export default App;
