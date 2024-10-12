import { useState, ChangeEvent, FormEvent } from 'react';
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter a search term!');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
