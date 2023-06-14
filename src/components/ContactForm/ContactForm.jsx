import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let newContact = { name: this.state.name, number: this.state.number };
    this.props.onFormSubmit(newContact);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const nameInputId = nanoid();
    const numberInputId = nanoid();
    return (
      <form type="submit" className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.label} htmlFor={nameInputId}>
          Name
        </label>
        <input
          className={css.input}
          id={nameInputId}
          type="text"
          name="name"
          onChange={this.handleInput}
          value={this.state.name}
          placeholder="Enter name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.label} htmlFor={numberInputId}>
          Number
        </label>
        <input
          className={css.input}
          id={numberInputId}
          type="tel"
          name="number"
          onChange={this.handleInput}
          value={this.state.number}
          placeholder="Enter number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
