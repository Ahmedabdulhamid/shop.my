import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getOrderforuser } from './REDUXTOOLKIT/Communication';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import "./home.css"
const columns = [
  { id: 'name', label: 'SN', minWidth: 170 },
  { id: 'code', label: 'Phone Number', minWidth: 100 },
  {
    id: 'population',
    label: 'Name',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Product Name',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Products Quantity',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'density',
    label: 'Products Image',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'density',
    label: 'Total Price',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'density',
    label: 'Order Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'density',
    label: 'Adrress',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

export const PurchasesPage = () => {
  const dispatch = useDispatch()
  const { orderForUser,loading } = useSelector((s) => s.userContact)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    dispatch(getOrderforuser())
  }, [])
  const rows = orderForUser

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className='mt-5 container '>
      {loading===false?( rows.length === 0 ? (
        <div className='d-flex justify-content-center align-items-center mt-5'>
          <div className='card shadow-lg p-3 d-flex justify-content-center align-items-center   vh-100'>
            <h3 className='mt-5 text-center'>You don't have orders !</h3>
          </div>
        </div>

      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, idx) => {
                    return (

                      <TableRow>
                        <TableCell key={idx} >
                          {idx + 1}
                        </TableCell>
                        <TableCell key={idx} >
                          {row.phonenumbers}
                        </TableCell>

                        <TableCell key={idx} align='right' className='ms-5'>
                          {row.fname + " " + row.lname}
                        </TableCell>
                        <TableCell key={idx} align='right'>
                          {row.product_name}
                        </TableCell>
                        <TableCell key={idx} align='right'>
                          {row.product_quantity}
                        </TableCell>
                        <TableCell key={idx} align='right'>
                          <Stack direction="row" className='ms-5' >
                            <Avatar sx={{ width: 56, height: 56 }} src={row.product_image} variant="square">

                            </Avatar>

                          </Stack>
                        </TableCell>
                        <TableCell key={idx} align='right'>
                          $ {row.total_price}
                        </TableCell>
                        <TableCell key={idx} align='right'>
                          {row.created_at}
                        </TableCell>
                        <TableCell key={idx} align='right'>
                          {row.Address}
                        </TableCell>

                      </TableRow>





                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>



      )):(
        <div className='d-flex justify-content-center mt-5'>
        <span class="loader"></span>
      </div>
      )}
      

    </div>
  )
}
