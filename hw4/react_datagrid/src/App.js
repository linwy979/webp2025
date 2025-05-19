
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Box, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: '名稱', width: 250 },
  { field: 'location', headerName: '地點', width: 300 },
  { field: 'price', headerName: '票價', width: 150 },
];

function App() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetch(
      'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'
    )
      .then((res) => res.json())
      .then((json) => {
        const formatted = json.map((item, index) => ({
          id: index + 1,
          title: item.title,
          location: item.showInfo?.[0]?.location || '無資料',
          price: item.showInfo?.[0]?.price || '無資料',
        }));
        setData(formatted);
        setFiltered(formatted);
      });
  }, []);

  const handleSearch = () => {
    const result = data.filter((item) => item.title.includes(keyword));
    setFiltered(result);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        景點觀光展覽資訊
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <TextField
          label="輸入關鍵字"
          variant="outlined"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          搜尋
        </Button>
      </Box>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </Box>
  );
}

export default App;
