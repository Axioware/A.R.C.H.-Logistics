// import React, { useState, useEffect } from 'react';
import Table from './Table';
import Pagination from './Pagination';

export default function TableContent({
      table_headings,
      sorting_function,
      last_column,
      next_button,
      prev_button,
      fetchData,
      currentPage,
      totalPages,
      data,
      loading,
      success
    }) {


  const handleSort = (column) => {
    console.log('Sorting by column:', column);
  };

  const handleRefresh = () => {
    fetchData();
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
        onNext={next_button}
        onPrev={prev_button}
        />
      </div>
    </div>
  );
}
