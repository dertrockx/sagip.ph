import React from 'react';

const Input = ({ name, type, label, required, placeholder, selectOptions = [], onChange = () => {} }) => (
  <div className="input-container">
    {label && (
      <label
        htmlFor={name}
        className={`input-label ${required ? 'input-label-required' : ''}`}
      >
        {label}
      </label>
    )}
    {type === 'select' ?
      <select name={name} id={name} className="input" onChange={onChange}>
        {placeholder && (<option value="" disabled selected>{placeholder}</option>)}
        {selectOptions.map(({ key, text }, i) => (
          <option key={i} value={key}>{text}</option>
        ))}
      </select>
    : (
      <input
        className="input"
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}

        onChange={onChange}
      />
    )
    }
  </div>
);

export default Input;
