import { BiSearch } from 'react-icons/bi';
import styles from './Search.module.css';
import { useState } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(searchTerm);
    setSearchTerm('');
  };
  return (
    <form className={styles.outer} onSubmit={handleSearch}>
      <input
        type="text"
        className={styles.inner}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.icon}>
        <BiSearch size={26} />
      </div>
    </form>
  );
}
