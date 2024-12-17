import React, { useState, useEffect } from 'react';
import PageHeading from './PageHeading';
import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import Table from './Table';
import Pagination from './Pagination';

export default function App(
  table_headings,
  sorting_function,
  url,
  loading_p,
  success_p,
  last_column
) {
  
  const [currentPage, setCurrentPage] = useState(null);
  const totalPages = null;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(loading_p);
  const [success, setSuccess] = useState(success_p);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterClick = () => {
    console.log('Filter button clicked');
  };

  const handleSearch = (searchText) => {
    console.log('Search initiated for:', searchText);
  };

  const handleSort = (column) => {
    console.log('Sorting by column:', column);
  };

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Simulate fetching data
    setLoading(true);
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        setData([{ Name: 'Alice', Age: 25, City: 'New York' }, { Name: 'Bob', Age: 30, City: 'Los Angeles' }, { Name: 'Charlie', Age: 22, City: 'Chicago' }]);
        setSuccess(true);
      } else {
        setSuccess(false);
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>

      {/* Table Component */}
      <div>
        <Table
          headings={table_headings}
          heading_background={[23, 23, 23]}
          heading_color={[255, 255, 255]}
          sort_function={sorting_function}
          data={data}
          loading={loading}
          success={success}
          last_column={last_column}
          // last_column_text="Details"
          handleRefresh={handleRefresh}
        />
      </div>

      {/* Pagination Component */}
      <div>
        <Pagination
        current_page={currentPage || 0}
        total_pages={totalPages || 0}
        text_color={[0, 0, 0]}
        button_text_color={[255, 255, 255]}
        button_background_color={[23, 23, 23]}
        width="95%"
        height="50px"
        onNext={handleNext}
        onPrev={handlePrev}
        />
      </div>
    </div>
  );
}
