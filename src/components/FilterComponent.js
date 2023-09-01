import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SortByAlpha from '@mui/icons-material/SortByAlpha';
import Sort from '@mui/icons-material/Sort';

import CheckList from './CheckList';

export default function FilterComponent({ sortName, sortStatus }) {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (buttonName) => {
    if (selectedButtons.includes(buttonName)) {
      setSelectedButtons(selectedButtons.filter((name) => name !== buttonName));
    } else {
      setSelectedButtons([...selectedButtons, buttonName]);
    }
  };

  const isButtonActive = (buttonName) => selectedButtons.includes(buttonName);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ flexDirection: 'row', marginRight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onClick={() => {
            handleButtonClick('name');
            sortName(); // Call the sortName function to trigger name sorting
          }}
          style={{ backgroundColor: isButtonActive('name') ? 'white' : 'transparent', borderRadius: 50 }}
        >
          <p style={{ color: isButtonActive('name') ? '#2743AA' : 'white', marginLeft: 10 }}>Name</p>
          <SortByAlpha style={{ color: isButtonActive('name') ? '#2743AA' : 'white' }} />
        </Button>
      </div>

      <div style={{ flexDirection: 'row', marginRight: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: isButtonActive('status') ? '#2743AA' : 'white', marginRight: 10 }}>Status</p>
        <Sort style={{ color: isButtonActive('status') ? '#2743AA' : 'white', marginRight: 10 }} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <CheckList label="PENDING"></CheckList>
          <CheckList label="OVERDUE"></CheckList>
          <CheckList label="CLEARED"></CheckList>
        </div>
      </div>
    </div>
  );
}
