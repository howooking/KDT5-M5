import { getproduct } from '@/api/transactionApi';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  // 검색어를 state에 저장
  const navigate= useNavigate()
  const [searchTerm, setSearchTerm] = useState({
    searchText: '',
    // searchTags: []
  });

  // 검색 input에서 변화가 발생할 때 입력값을 state에 저장
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setSearchTerm({
      ...searchTerm,
      [name]: value
    })
  };

  // 검색(검색 아이콘을 누르거나 엔터를 눌렀을 때)
  const handleSearch = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(searchTerm);
    const res = await getproduct(searchTerm)
    
    // navigate('/') 제품나오는 화면으로 가게하기.
    setSearchTerm({
      searchText: '',
      // searchTags: []
    });//검색창 초기화
  };

  return (
    <form
      className="absolute left-[calc(50%-165px)] flex h-[44px] w-[330px] items-center py-2 pl-2 pr-9 ring-2 ring-accent"
      onSubmit={handleSearch}
    >
      <input
        className="w-full focus:outline-none"
        name='searchText'
        value={searchTerm.searchText}
        onChange={handleChange}
      />
      <div className="absolute right-2 cursor-pointer text-accent">
        <BiSearch size={26} />
      </div>
    </form>
  );
}
