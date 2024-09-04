import React, {FC} from 'react';
import "./input.scss";

interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    className?: string;
    errorMessage?: string;
}

const Input:FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  className='',
  errorMessage}) => {
    return (
        <div className={`input-container ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <input
                className={`input-field ${errorMessage ? 'input-error' : ''}`}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
            />
            {errorMessage && <span className="input-error-message">{errorMessage}</span>}
        </div>
    );
};

export default Input;