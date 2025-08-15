// DtrForOnsite.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserForDtrOnsite, clearUserSearchResult } from '../../../store/features/userSlice';
import './DtrForOnsite.css';
import debounce from 'lodash.debounce';
import DtrTableForOnsite from '../../../components/dtr-table-for-onsite/DtrTableForOnsite';
import { getCurrentDtr } from '../../../store/features/dtrSlice';

const DtrForOnsite = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [employee, setEmployee] = useState(null);
  const [showDtrTable, setShowDtrTable] = useState(false)

  const [myDtr, setMyDtr] = useState(null)

  const { userSearchResult, userSearchLoding } = useSelector(state => state.users);
  // const { currentDtr} = useSelector(state => state.dtr);

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

  const handleSelect = (fullname, user) => {
    setQuery(fullname);
    setEmployee(user);
    dispatch(clearUserSearchResult());
  };

  const handleSearch = () => {
    if(employee) {
      setQuery('');
      dispatch(getCurrentDtr({ user_id: employee.id, status: 'pending' }))
      setShowDtrTable(true)
    }
  };

  // useEffect(() => {
  //   if(currentDtr) {
  //     setMyDtr(currentDtr);
  //   }
  // }, [currentDtr])
  

  return (
    <>
      <div className="search-page min-vh-100 d-flex flex-column align-items-center">
        {/* Search Input */}
        <div className="search-wrapper container px-3 py-3 shadow rounded-4 bg-white mt-5" style={{ maxWidth: '600px' }}>
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
              onClick={() => handleSearch()}
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
                  onClick={() =>
                    handleSelect(
                      `${user.firstname} ${user.lastname} (${user.employee_id})`,
                      user
                    )
                  }
                >
                  {`${user.firstname} ${user.lastname} (${user.employee_id})`}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* DTR Table — closer to search */}
        <div className="mt-2 w-100 d-flex justify-content-center">
 
          {showDtrTable && (
            <div className="mt-4 w-100 d-flex flex-column align-items-center">
              {/* Employee Name */}
              <h1 className="employee-name text-center mb-3">
                { employee ? `${employee.firstname} ${employee.lastname}` : 'No Details available'}
              </h1>

              {/* DTR Table */}
              <DtrTableForOnsite employee={employee} />
            </div>
          )}

        </div>
      </div>
    </>

  );
};

export default DtrForOnsite;
