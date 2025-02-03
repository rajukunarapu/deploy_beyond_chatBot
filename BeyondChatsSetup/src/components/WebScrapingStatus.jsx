import { Button, Typography, TableContainer, Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ScrapedData = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { url, desc, cName } = location.state || {};

  return (
    <>
      <Typography variant="h5" fontWeight={'bold'} mb={3} sx={{ textAlign: 'center' }}>Scraped Webpages</Typography>

      <TableContainer sx={{ width: '90%', border: '2px solid gray', borderRadius: 3, overflowX: 'auto' ,ml:2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderRight: '1px solid gray', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>Company Name</TableCell>
              <TableCell sx={{ borderRight: '1px solid gray', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>URL</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ borderRight: '1px solid gray', cursor: 'pointer' }}>{cName}</TableCell>
              <TableCell sx={{ borderRight: '1px solid gray', cursor: 'pointer' }}>{url}</TableCell>
              <TableCell>{desc}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="success" sx={{ mt: 3, width: '100%', maxWidth: 300, display: 'block',ml:2}} onClick={() => navigate("/integration")}>
        Proceed to Integration
      </Button>
    </>
  );
};

export default ScrapedData;
