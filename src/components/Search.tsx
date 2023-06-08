import { BiSearch } from 'react-icons/bi';
// import styles from './Search.module.css';
import { useState } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(searchTerm);
    setSearchTerm('');
  };
  return (
    <form
      className="absolute left-[calc(50%-165px)] flex h-[44px] w-[330px] items-center py-2 pl-2 pr-9 ring-2 ring-accent"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        className="w-full focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute right-2 cursor-pointer text-accent">
        <BiSearch size={26} />
      </div>
    </form>
  );
}
