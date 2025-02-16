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
            
        `}
      </style>
    </div>
  );
}
