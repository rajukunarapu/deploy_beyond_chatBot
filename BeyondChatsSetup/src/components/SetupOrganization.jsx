import { Container, Paper, TextField, Typography, Alert, Button, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetupOrganization = () => {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [openUrlAlert, setOPenUrlAlert] = useState(false);
  const [tableData, setTableData] = useState([]);

  const handleTableData = () => {
    const newData = { url: website, desc: description, companyName: name };
    setTableData((prevData) => [...prevData, newData]);
    setName('');
    setWebsite('');
    setDescription('');
  };

  const fetchMetaDescription = async (url) => {
    if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(url)) {
      setOPenUrlAlert(false);
      try {
        let res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/fetch-meta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
        let data = await res.json();
        if (data.description) setDescription(data.description);
      } catch (error) {
        console.error("Error fetching meta description :", error);
      }
    } else {
      setDescription('');
      setOPenUrlAlert(true);
    };
  };

  return (
    <>
      <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p: 3, pt: 5 }}>
        <Paper elevation={4} sx={{
          p: { xs: 3, sm: 5 }, borderRadius: 5,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'
        }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>Setup Organization</Typography>

          <TextField
            variant="outlined" label="Company Name" value={name} onChange={(e) => setName(e.target.value)} color="warning" autoFocus
            sx={{ width: '100%', mt: 2 }} size="medium"
          />

          <TextField
            variant="outlined" label="Website URL" value={website} onChange={(e) => {
              setWebsite(e.target.value);
              fetchMetaDescription(e.target.value);
            }} color="warning"
            sx={{ width: '100%', mt: 2 }} size="medium"
          />
          {openUrlAlert && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>Enter valid URL</Alert>}

          <TextField
            variant="outlined" label="Description" multiline minRows={1} maxRows={6} value={description}
            onChange={(e) => setDescription(e.target.value)} color="warning"
            sx={{ width: '100%', mt: 2 }} size="medium"
          />

          <Button variant="contained" sx={{ width: '100%', mt: 2, backgroundColor: '#10a37f', color: 'white', textTransform: 'capitalize' }} size="large" onClick={handleTableData}>
            Continue
          </Button>
        </Paper>
      </Container>

      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p: 3, pt: 5 }}>
        <TableContainer sx={{ width: '100%', border: '2px solid gray', borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderRight: '1px solid gray', fontWeight: 'bold', fontSize: '16px', width: 150, textAlign: 'center' }}>URL</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((item, ind) => (
                <TableRow key={ind}>
                  <TableCell sx={{ borderRight: '1px solid gray', cursor: 'pointer' }} onClick={() => navigate('/scraped-data', { state: { url: item.url, desc: item.desc, cName: item.companyName } })}>
                    {item.url}
                  </TableCell>
                  <TableCell>{item.desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default SetupOrganization;
