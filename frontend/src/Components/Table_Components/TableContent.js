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
      table_function,
      loading,
      success,
      table_width_function
    }) {

  const handleSort = (column) => {
    console.log('Sorting by column:', column);
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="table-content-wrapper">
      {/* Table Component */}
      <div className="table-wrapper">
        <Table
          headings={table_headings}
          heading_background={[23, 23, 23]}
          heading_color={[255, 255, 255]}
          sort_function={sorting_function}
          data={data}
          loading={loading}
          success={success}
          table_width_function={table_width_function}
          table_function = {table_function}
          last_column={last_column}
          handleRefresh={handleRefresh}
        />
      </div>

      {/* Pagination Component */}
      <div className="pagination-wrapper">
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
      
      {/* Styles for responsiveness */}
      <style>
        {`
          .table-content-wrapper {
            width: 100%;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
            // fontFamily: 'Roboto, sans-serif',

          }

          .table-wrapper {
            margin-bottom: 20px;
            overflow-x: auto;
          }

          .pagination-wrapper {
            margin-top: 20px;
            text-align: center;
          }
            
        `}
      </style>
    </div>
  );
}
