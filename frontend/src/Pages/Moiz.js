import React, { useState, useEffect } from 'react';
import Table from '../Components/Table_Components/Table';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // Track sort order

  const headings = ['Name', 'Age', 'City'];

  // Simulate API request
  const loadingFunction = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; // Random success or failure
        if (success) {
          resolve([
            // Simulate a successful response
            { Name: 'Alice', Age: 25, City: 'New York' },
            { Name: 'Bob', Age: 30, City: 'Los Angeles' },
            { Name: 'Charlie', Age: 22, City: 'Chicago' },
          ]);
        } else {
          reject('Failed to load data');
        }
      }, 2000); // Simulate 2-second delay
    });
  };

  useEffect(() => {
    fetchData(); // Initial data load
  }, []);

  // Function to fetch data
  const fetchData = () => {
    setLoading(true); // Set loading to true while data is being fetched
    loadingFunction()
      .then((data) => {
        setData(data);
        setSuccess(true);
      })
      .catch(() => {
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false); // Stop loading after fetching data
      });
  };

  // Sorting handler
  const handleSort = (column) => {
    console.log(`Sorting by column: ${column}`);
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  // Handle refresh button click
  const handleRefresh = () => {
    fetchData(); // Call fetchData to refresh the data
  };

  return (
    <div className="table-container">
      <Table
        number_of_headings={headings.length}
        headings={headings}
        heading_background={[30, 61, 89]} // Purple background
        heading_color={[255, 255, 255]} // White text color
        sort_function={handleSort}
        data={data}
        loading={loading}
        success={success}
        last_column={true}
        last_column_text="Details"
        last_column_icon="https://example.com/icon.png" // Replace with your icon URL
        last_column_function={() => {}}
        handleRefresh={handleRefresh} // Pass the refresh function
      />
    </div>
  );
}

export default App;
