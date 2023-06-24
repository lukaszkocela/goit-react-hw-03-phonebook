import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Phonebook } from './Phonebook/Phonebook';
import { PhoneBookList } from './PhoneBookList/PhoneBookList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

   setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  getLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));
  };

  componentDidMount() {
    if (this.getLocalStorage('contacts')) {
      this.setState({ contacts: this.getLocalStorage('contacts') });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState !== this.state.contacts) {
      this.setLocalStorage('contacts', this.state.contacts);
    }
  }

  handleSubmit = event => {
    const id = nanoid();
    const number = event.number;
    const name = event.name;

    const contactsLists = [...this.state.contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, id, number });
    }

    this.setState({ contacts: contactsLists });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  filteredList = () => {
    return this.state.contacts.filter(contact => {
      return contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
  };

  handleDelete = id => {
    this.setState(State => ({
      contacts: State.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter, number } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <Phonebook handleSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={this.handleChange} />
        <PhoneBookList
          contacts={this.filteredList()}
          number={number}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}