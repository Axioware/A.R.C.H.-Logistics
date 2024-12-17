import React, { useState, useEffect } from 'react';
import PageHeading from './PageHeading';
import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import Table from './Table';
import Pagination from './Pagination';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

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
      {/* Page Heading Component */}
      {/* <div>
        <PageHeading
          text="All Users"
          text_color={[23, 23, 23]}
          sidebar_color={[25, 106, 172]}
          width="100%"
          height="50px"
          font_size="2rem"
        />
      </div> */}

      {/* Filter Button Component */}
      {/* <div>
        <FilterButton
          text="+ Filter By"
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          function={handleFilterClick}
        />
      </div> */}

      {/* Search Bar Component */}
      {/* <div>
        <SearchBar
          hint="Search..."
          field_color={[230, 230, 230]}
          handleSearch={handleSearch}
          width="13%"
          height="50px"
        />
      </div> */}

      {/* Table Component */}
      <div>
        <Table
          headings={['Name', 'Age', 'City']}
          heading_background={[23, 23, 23]}
          heading_color={[255, 255, 255]}
          sort_function={handleSort}
          data={data}
          loading={loading}
          success={success}
          last_column={true}
          last_column_text="Details"
          handleRefresh={handleRefresh}
        />
      </div>

      {/* Pagination Component */}
      <div>
        <Pagination
        current_page={currentPage}
        total_pages={totalPages}
        text_color={[0, 0, 0]}
        button_text_color={[255, 255, 255]}
        button_background_color={[23, 23, 23]}
        width="90%"
        height="50px"
        onNext={handleNext}
        onPrev={handlePrev}
        />
      </div>
    </div>
  );
}
