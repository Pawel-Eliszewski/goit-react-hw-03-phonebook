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

  componentDidUpdate(prevState) {
    prevState = JSON.parse(localStorage.getItem('phonebook'));
    if (this.state.contacts.length !== prevState.length) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('phonebook')),
      });
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
      const list = JSON.parse(localStorage.getItem('phonebook'));
      list.push(newContact);
      localStorage.setItem('phonebook', JSON.stringify(list));
      this.setState({
        contacts: JSON.parse(localStorage.getItem('phonebook')),
      });
    } else {
      alert(`${input.name} is already in contacts.`);
    }
  };

  setFilterToState = value => {
    this.setState({ ...this.state, filter: `${value}` });
  };

  filteredContacts = contacts => {
    return contacts.filter(contact =>
      contact.name.toLocaleUpperCase().includes(this.state.filter)
    );
  };

  handleElementDelete = id => {
    const list = JSON.parse(localStorage.getItem('phonebook'));
    localStorage.setItem(
      'phonebook',
      JSON.stringify(list.filter(contact => contact.id !== id))
    );
    this.setState({
      contacts: JSON.parse(localStorage.getItem('phonebook')),
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
