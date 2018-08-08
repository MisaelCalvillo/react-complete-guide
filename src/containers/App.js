import React, { Component } from 'react';
import Classes from './App.css';
import Person from './../components/Persons/Person/Person';
import ErrorBoundary from './../components/ErrorBoundary/ErrorBoundary';

class App extends Component {

  state = {
    persons: [
      { id: 'sfasf', name: 'Max', age: 28 },
      { id: 'dfgsd', name: 'Manu', age: 29 },
      { id: 'rejje', name: 'Stephanie', age: 26 },
    ],
    showPersons: false
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
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map( (person, index) => (
              <ErrorBoundary>
              <Person 
                name={person.name} 
                age={person.age}
                click={() => this.deletePersonHandler(index)}
                key={person.id}
                changed={(event) => this.nameChangeHandler(event, person.id)}/>
              </ErrorBoundary>
          ))}
        </div>
      );

      btnClass = Classes.Red;
    }

    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(Classes.red);
    } 
    if(this.state.persons.length <= 1){
      assignedClasses.push(Classes.bold);
    }

    return (
        <div className={Classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
          className={btnClass}
          onClick={this.togglePersonsHandler}>Switch Name</button>
          {persons}
        </div>
    );  
  }
}

export default App;
