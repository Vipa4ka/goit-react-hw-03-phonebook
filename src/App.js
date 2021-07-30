import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import ContactForm from "./component/ContactForm";
import Filter from "./component/Filter";
import ContactList from "./component/ContactList";

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContacts = (text, tel) => {
    const contactsId = uuidv4();
    const add = {
      id: contactsId,
      name: text,
      number: tel,
    };

    if (this.state.contacts.find((contact) => contact.name === add.name)) {
      alert(`${add.name} is already in contacts!`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [add, ...contacts],
    }));
  };

  deleteContacts = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  getvisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContacts} />
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={this.getvisibleContacts()}
            onDeleteContacts={this.deleteContacts}
          />
        </div>
      </>
    );
  }
}
export default App;
