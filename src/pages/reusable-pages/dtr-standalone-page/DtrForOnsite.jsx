// DtrForOnsite.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserForDtrOnsite, clearUserSearchResult } from '../../../store/features/userSlice';
import './DtrForOnsite.css';
import debounce from 'lodash.debounce';

const DtrForOnsite = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const { userSearchResult, userSearchLoding } = useSelector(state => state.users);

  // Debounced dispatch function
  const debouncedSearch = useMemo(() => 
    debounce((keyword) => {
      dispatch(searchUserForDtrOnsite(keyword));
    }, 1500)
  , [dispatch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== '') {
      debouncedSearch(value);
    }
  };

  const handleSelect = (fullname) => {
    setQuery(fullname);
    dispatch(clearUserSearchResult());
  };


  // useEffect(() => {
  //   console.log("userSearchResult", userSearchResult.data)
  // }, [userSearchResult])
  



  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="search-page d-flex justify-content-center align-items-start min-vh-100 pt-5">
      <div className="search-wrapper container px-3 py-4 shadow rounded-4 bg-white mt-5">
        <label className="form-label text-muted fs-5 mb-3">
          🔍 Search for an employee
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="e.g. Ella Martinez"
            value={query}
            onChange={handleChange}
          />
          <button
            className="btn btn-soft-primary"
            onClick={handleSearch}
            type="button"
          >
            Search
          </button>
        </div>

        {query.trim() !== '' && userSearchResult.data?.length > 0 && (
          <ul className="suggestions list-group mt-2">
            {userSearchResult?.data.map((user, idx) => (
              <li
                key={idx}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelect(`${user.firstname} ${user.lastname} (${user.employee_id})`)}
              >
                { `${user.firstname} ${user.lastname} (${user.employee_id})` }
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DtrForOnsite;
