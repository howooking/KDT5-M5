import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  // 검색어를 state에 저장
  const [searchText, setSearchText] = useState('');

  // 검색 input에서 변화가 발생할 때 입력값을 state에 저장
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // 검색(검색 아이콘을 누르거나 엔터를 눌렀을 때)
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchText.trim() === '') {
      setSearchText('');
      return;
    }
    navigate(`/products/search`, { state: searchText });
    setSearchText('');
    return;
  };

  return (
    <form
      className="absolute left-[calc(50%-165px)] flex h-[44px] w-[330px] items-center py-2 pl-2 pr-9 ring-2 ring-accent"
      onSubmit={handleSearch}
    >
      <input
        className="w-full focus:outline-none"
        value={searchText}
        onChange={handleChange}
      />
      <div className="absolute right-2 top-[10px] cursor-pointer text-accent">
        <button>
          <BiSearch size={26} />
        </button>
      </div>
    </form>
  );
}
