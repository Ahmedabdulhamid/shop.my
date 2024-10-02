import React, { useEffect } from 'react'
import { getusers } from '../REDUXTOOLKIT/Operation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../REDUXTOOLKIT/Communication';
import { getDetails } from '../REDUXTOOLKIT/getAllProducts';
export const Dashboard = () => {
    const pieParams = { height: 200, margin: { right: 5 } };
    const palette = ['red', 'blue', 'green'];
    const { loading, arr } = useSelector((s) => s.usersSlice)
    const { orders } = useSelector((s) => s.userContact)
    const { products } = useSelector((s) => s.productSlice)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrders())
    }, [])
    useEffect(() => {
        dispatch(getusers())
    }, [])
    useEffect(() => {
        dispatch(getDetails())
    }, [])


    return (

        <div className='container mt-5'>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 my-2">
                    <div className='card py-5 text-light text-center' style={{ background: "aquamarine" }}>
                    <div className='d-flex justify-content-center'>
                            <h5>Products</h5>
                            <span className='mx-2 fw-bold'>{products.length}</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 my-2">
                    <div className='card py-5 text-light text-center' style={{ background: "red" }}>
                        <div className='d-flex justify-content-center'>
                            <h5>Users</h5>
                            <span className='mx-2 fw-bold'>{arr.length}</span>
                        </div>

                    </div>
                </div>
                <div className="col-lg-4 col-md-d col-sm-12 my-2">
                    <div className='card py-5 text-light text-center' style={{ background: "yellow" }}>

                        <div className='d-flex justify-content-center'>
                            <h5>Orders</h5>
                            <span className='mx-2 fw-bold'>{orders.length}</span>
                        </div>


                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        width={500}
                        height={300}
                        className='w-100'
                    />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                                valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
                            },
                            {
                                data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
                            },
                            {
                                data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
                                valueFormatter: (value) => (value == null ? '?' : value.toString()),
                            },
                        ]}
                        width={500}
                        height={300}
                        className='w-100'
                        margin={{ top: 10, bottom: 20 }}
                    />
                </div>
                <div className="col-lg-4 col-md-d col-sm-12">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                                area: true,
                            },
                        ]}
                        width={500}
                        height={300}
                        className='w-100'
                    />
                </div>
            </div>
            <Stack direction="row" width="100%" textAlign="center" spacing={2} className=''>
                <Box flexGrow={1}>
                    <Typography>Products</Typography>
                    <PieChart
                        series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
                        {...pieParams}
                    />
                </Box>
                <Box flexGrow={1}>
                    <Typography>Users</Typography>
                    <PieChart
                        colors={palette}
                        series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
                        {...pieParams}
                    />
                </Box>
                <Box flexGrow={1}>
                    <Typography>Orders</Typography>
                    <PieChart
                        series={[
                            { data: [{ value: 10, color: 'orange' }, { value: 15 }, { value: 20 }] },
                        ]}
                        {...pieParams}
                    />
                </Box>
            </Stack>



        </div>


    )
}

