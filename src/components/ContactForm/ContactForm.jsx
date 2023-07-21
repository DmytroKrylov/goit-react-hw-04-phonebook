import React, { useState } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = ({ onAdd, onCheckUnique }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChangeForm = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const { name, number } = formData;
    const isValidateForm = validateForm();
    if (!isValidateForm) return;
    onAdd({ name, number });
    resetForm();
  };

  const resetForm = () => setFormData(INITIAL_STATE);

  const validateForm = () => {
    const { name } = formData;
    return onCheckUnique(name);
  };

  const { name, number } = formData;

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChangeForm}
      />
      <input
        type="tel"
        name="number"
        placeholder="Enter your number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChangeForm}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCheckUnique: PropTypes.func.isRequired,
};

export default ContactForm;
