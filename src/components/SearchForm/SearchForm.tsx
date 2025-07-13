import React from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './SearchForm.module.css';

interface FormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export class SearchForm extends React.Component<FormProps> {
  render() {
    const { value, onSubmit, onChange } = this.props;
    return (
      <form className="search-form" onSubmit={onSubmit}>
        <Input
          type="text"
          value={value}
          className="search-input"
          placeholder="Search for characters from Rick and Morty, e.g: Rick Sanchez"
          onChange={onChange}
        />
        <Button type="submit" className="search-btn" text="Search" />
      </form>
    );
  }
}
