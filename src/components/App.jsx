import React, { Component } from 'react';

import Title from './Title/Title';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import localstorage from 'js/localstorage';

import css from './app.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  getContacts = () => {
    if (localstorage.load('contacts') === undefined) {
      return [];
    }
    return localstorage.load('contacts');
  };
  handleAddContact = ({ id, name, number }) => {
    let contacts = this.getContacts();
    const namesArr = contacts.map(el => el.name.toLowerCase());
    if (!namesArr.includes(name.toLowerCase())) {
      localstorage.save('contacts', [
        ...contacts,
        { id, name: name, number: number },
      ]);
      this.setState(() => ({
        contacts: contacts,
      }));
    } else {
      alert(`"${name}" is already added to contact list.`);
    }
  };
  handleDeleteContact = userId => {
    let contacts = this.getContacts();
    localstorage.save(
      'contacts',
      contacts.filter(user => user.id !== userId)
    );
    this.setState(() => ({
      contacts: contacts,
    }));
  };
  handleChangeSearch = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };
  applyFilter = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(({ name }) => 
      !(filter && !name.toLowerCase().includes(filter.toLowerCase()))
    );
  };
  componentDidMount() {
    this.setState({ contacts: this.getContacts() });
  }
  render() {
    const { filter } = this.state;
    return (
      <div className={css.app}>
        <div className={css.appContainer}>
          <Title title="Add contact" />
          <ContactForm toAddContact={this.handleAddContact} />
          <Title title="Find contact" />
          <Filter filter={filter} onChangeInput={this.handleChangeSearch} />
          <ContactList
            contactList={this.applyFilter()}
            toDeleteContact={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}
