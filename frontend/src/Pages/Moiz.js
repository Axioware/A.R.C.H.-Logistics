import React from 'react';
import Box from '../Components/General/GeneralBox';

function Moiz() {
    return (
        <div className="App">
          {/* Default Box */}
          <Box
            loading={false}
            success={false}
            color={[30, 61, 89]}
            text="Task Pending"
            number={743}
            id="uniqueBoxId1"
            width="28%"
            height="120px"
          />
        </div>
      );
}

export default Moiz;
