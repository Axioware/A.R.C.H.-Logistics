
function rgbArrayToString(rgbArray) {
  if (Array.isArray(rgbArray) && rgbArray.length === 3) {
    const [r, g, b] = rgbArray;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return '#1E3D59';
}

export default function Table({
  headings,
  heading_background,
  heading_color,
  sort_function,
  data,
  loading,
  success,
  last_column,
  last_column_text,
  last_column_icon,
  last_column_function,
  handleRefresh,
}) {
  const headingBackgroundColor = rgbArrayToString(heading_background);
  const headingTextColor = rgbArrayToString(heading_color);

  return (
    <div className="table-wrapper">
      {loading ? (
        <div className="table-loading-spinner">
          <div className="table-spinner"></div>
        </div>
      ) : success ? (
        <table className="table">
          <thead>
            <tr style={{ backgroundColor: headingBackgroundColor, color: headingTextColor }}>
              {headings.map((heading, index) => (
                <th key={index} onClick={() => sort_function(heading)}>
                  {heading}
                </th>
              ))}
              {last_column && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headings.map((heading, colIndex) => (
                  <td key={colIndex}>{row[heading]}</td>
                ))}
                {last_column && (
                  <td>
                    <button
                      onClick={() => last_column_function(row)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      {last_column_icon ? (
                        <img
                          src={last_column_icon}
                          alt="Action Icon"
                          style={{ width: '20px', height: '20px' }}
                        />
                      ) : (
                        last_column_text
                      )}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>Failed to load data.</p>
          <button
            className="table-refresh-button"
            onClick={(e) => {
              e.stopPropagation();
              handleRefresh();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24">
              <path
                fill="black"
                d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20"
              />
            </svg>
          </button>
        </div>
      )}

      <style>
        {`
          .table-wrapper {
            max-width: 100%;
            text-align: center;
            font-family: 'Arial', sans-serif;
            margin: 0px 0px 0px 0px;
          }

          .table {
            width: 95%;
            border-collapse: collapse;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
          }

          .table th,
          .table td {
            padding: 15px;
            text-align: left;
            border: none;
          }

          .table th {
            background-color: ${headingBackgroundColor};
            color: ${headingTextColor};
            font-weight: bold;
            text-transform: uppercase;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .table tr:nth-child(even) {
            background-color: #f8f9fa;
          }

          .table tr:nth-child(odd) {
            background-color: #ffffff;
          }

          .table tr:hover {
            background-color: #f1f1f1;
          }

          .table td {
            font-size: 14px;
            color: #333;
          }

          .table-loading-spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
          }

          .table-spinner {
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .table-refresh-button {
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          .table-refresh-button:hover {
            // background-color: #3E5A79;
          }

          .table-refresh-button svg {
            margin-left: 10px;
            transition: transform 0.3s ease;
          }

          .table-refresh-button:hover svg {
            transform: rotate(360deg);
          }
        `}
      </style>
    </div>
  );
}
