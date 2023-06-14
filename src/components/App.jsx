import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (localStorage.getItem('phonebook') === null) {
      localStorage.setItem('phonebook', JSON.stringify([]));
    } else {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('phonebook')),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
    }
  }

  handleFormSubmit = input => {
    if (
      !this.state.contacts.map(contact => contact.name).includes(input.name)
    ) {
      const newContact = {
        id: nanoid(),
        name: input.name,
        number: input.number,
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    } else {
      alert(`${input.name} is already in contacts.`);
    }
  };

  setFilterToState = value => {
    this.setState({ filter: `${value}` });
  };

  filteredContacts = contacts => {
    return contacts.filter(contact =>
      contact.name.toLocaleUpperCase().includes(this.state.filter)
    );
  };

  handleElementDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    return (
      <div className="main">
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={this.handleFormSubmit} />
        <h2>Contacts</h2>
        <Filter onFilterInput={this.setFilterToState} />
        <ContactList
          contacts={this.filteredContacts(this.state.contacts)}
          onContactDelete={this.handleElementDelete}
        />
      </div>
    );
  }
}
