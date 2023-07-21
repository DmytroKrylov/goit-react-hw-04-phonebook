import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = ({ onAdd, onCheckUnique }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChangeForm = useCallback(({ target }) => {
    const { name, value } = target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback(
    e => {
      e.preventDefault();
      const { name, number } = formData;
      const isValidateForm = validateForm();
      if (!isValidateForm) return;
      onAdd({ name, number });
      resetForm();
    },
    [formData, onAdd]
  );

  const resetForm = useCallback(() => setFormData(INITIAL_STATE), []);

  const validateForm = useCallback(() => {
    const { name } = formData;
    return onCheckUnique(name);
  }, [formData, onCheckUnique]);

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
