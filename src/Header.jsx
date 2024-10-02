import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { FaSearch } from "react-icons/fa";
import { search, getallcategories } from './REDUXTOOLKIT/getAllProducts';
import "./header.css"
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Link, NavLink, useNavigate } from "react-router-dom"
import { MdShoppingCart } from "react-icons/md";
import { getAllProductsFromAddToCart } from './REDUXTOOLKIT/getAllProducts';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import { MdDashboard } from "react-icons/md";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PagesOutlinedIcon from '@mui/icons-material/PagesOutlined';
import { logout } from './REDUXTOOLKIT/Operation';

import { AddToCart } from './REDUXTOOLKIT/getAllProducts';
import Cookies from "js-cookie"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
const Header = () => {


  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick10 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose10 = () => {
    setAnchorEl(null);
  };
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose1 = () => setShow(false);
  const handleShow1 = () => setShow(true);
  const handleClose = () => setShow1(false);
  const handleShow = () => setShow1(true);
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const navigate = useNavigate()
  const handelSearch = (e) => {

    e.preventDefault()

    dispatch(search(name))
    navigate(`/search/${name}`)
    setShow1(false);
    handleClose()
    setName("")
  }
  //const { objlogin,isLogin} = useSelector((s) => s.usersSlice)
  const { cartArray, loading, arrCategory, productDetails, cookie } = useSelector((s) => s.productSlice)
  const { objlogin, isLogin } = useSelector((s) => s.usersSlice)
  useEffect(() => {
    dispatch(getallcategories())
  }, [])
  const handleClick = () => {
    dispatch(logout())
    navigate('/login')
    handleClose10()
    localStorage.clear()
  }
  useEffect(() => {

    const data = {
      ...productDetails,


    }
    dispatch(AddToCart(data))


  }, [])


  useEffect(() => {


    dispatch(getAllProductsFromAddToCart())

  }, [])

  const [showDashBoard, setShowDashBoard] = useState(false);

  const handleCloseDashBoard = () => setShowDashBoard(false);
  const handleShowDashBoard = () => setShowDashBoard(true);

  const [show5, setShow5] = useState(false)
  const handleClose4 = () => setShow5(false);
  const handleShow4 = () => setShow5(true);
  const handleNavigate = () => {

    handleClose4();
  }
  useEffect(() => {
    fetch("https://ahmedabdulhamidm-001-site1.atempurl.com/session.php")
      .then(res => res.json())
      .then((data) => {
        if (Cookies.get("PHPSESSID") == undefined) {
          Cookies.set("PHPSESSID", data.user, { expires: 30 })
        }

      })
  }, [])
  useEffect(() => {
    Cookies.get("PHPSESSID");
    console.log(Cookies.get("PHPSESSID"));
    //Cookies.set("PHPSESSID",Cookies.get("PHPSESSID"),{expires:30})
  }, [])

  return (
    <div>
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand} className="fixed-top mb-3" style={{ backgroundColor: "#273036" }}>

          <Container fluid className='x'>
            <span className='text-light fs-1 categorybar' onClick={handleShow4}>
              < HiMiniBars3BottomRight />

            </span>


            <Offcanvas show={show5} style={{ minWidth: '240px' }} className="w-25">
              <Offcanvas.Header closeButton onClick={() => setShow5(false)}>
                <Offcanvas.Title>Categories</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='navbar3'>
                {
                  arrCategory.map((e, idx) => (
                    <div className='my-1 ' >
                      <NavLink className="px-3 " style={{ display: "block", color: "orange", textDecoration: "none" }} key={idx} onClick={handleNavigate}
                        as={Link}
                        to={`/category/${e}`}


                      >
                        {e}
                        <hr style={{ color: "orange" }} />
                      </NavLink>
                    </div>

                  ))
                }



              </Offcanvas.Body>
            </Offcanvas>
            <NavLink className="navbar-brand" as={Link} to="/">
              <span className='fw-bold fs-3 text-light'>Shop.</span>
              <span className="fw-bold fs-3" style={{ color: "white" }}>My</span>
            </NavLink>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={handleShow1} />

            <Navbar.Offcanvas
              show={show}
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"

              className="w-100 bg-dark"
            >
              <Offcanvas.Header closeButton onClick={handleClose1} className='btn-close btn-close-white' >
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul className="navbar-nav m-auto text-light">

                  <li className="nav-item">
                    <Nav.Link

                      className="nav-link text-light"
                      activeClassName="active"
                      as={Link}
                      exact
                      to={'/'}
                      onClick={handleClose1}
                    >
                      Home
                    </Nav.Link>

                  </li>
                  <li className="nav-item">
                    <Nav.Link

                      className="nav-link text-light"
                      activeClassName="active"
                      as={Link}
                      exact
                      to={'/register'}
                      onClick={handleClose1}
                    >
                      register
                    </Nav.Link>

                  </li>
                  <li className="nav-item">
                    {localStorage.login ? (<div>
                      <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick10}
                        variant='outline-dark'
                        className='text-light'
                        onClose={handleClose1}
                      >
                        {JSON.parse(localStorage.login).data.fname+" "+JSON.parse(localStorage.login).data.lname }
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClick={handleClose1}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <Nav.Link as={Link} to="/profile">
                          <MenuItem onClick={handleClose10} onClose={handleClose1}>Profile</MenuItem>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/purchases">
                          <MenuItem onClick={handleClose10} onClose={handleClose1}>My Orders</MenuItem>
                        </Nav.Link>

                        <MenuItem onClick={handleClick} onClose={handleClose1}>Logout</MenuItem>
                      </Menu>
                    </div>) : (<Nav.Link className='text-light' as={Link} to={'/login'} onClick={handleClose1} >login</Nav.Link>)}




                  </li>
                  <li className="nav-item">
                    <Nav.Link

                      className="nav-link text-light"
                      activeClassName="active"
                      as={Link}
                      exact
                      to='/contact'
                      onClick={handleClose1}
                    >
                      contact us
                    </Nav.Link>
                  </li>
                  {localStorage.login ? (<li className="nav-item">
                    {JSON.parse(localStorage.login).data.admin === true ? (<Nav.Link
                      className="nav-link text-light"
                      activeClassName="active"
                      as={Link}
                      exact
                      onClick={handleClose1}

                    >
                      <Button variant="transparent-none" onClick={handleShowDashBoard}>
                        <MdDashboard className='text-light fs-3 ' />
                      </Button>


                      <Offcanvas show={showDashBoard} onHide={handleCloseDashBoard} style={{ minWidth: "240px" }} className="w-25 bg-dark">
                        <Offcanvas.Header className='text-primary' >

                        </Offcanvas.Header>
                        <Offcanvas.Title className='text-light text-center'>  < DashboardOutlinedIcon />Material Dashboard</Offcanvas.Title>
                        <Offcanvas.Body className='text-light'>
                          <List>
                          <ListItem disablePadding>
                              <NavLink as={Link} to="/dashboard/home" className={"text-light"} onClick={handleCloseDashBoard} style={{ textDecoration: "none" }}>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <MapsHomeWorkIcon className='text-light' />
                                  </ListItemIcon>
                                  <ListItemText primary="Home Dashboard" />
                                </ListItemButton>
                              </NavLink>

                            </ListItem>
                            <ListItem disablePadding>
                              <NavLink as={Link} to="/dashboard/products" className={"text-light"} onClick={handleCloseDashBoard} style={{ textDecoration: "none" }}>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <PagesOutlinedIcon className='text-light' />
                                  </ListItemIcon>
                                  <ListItemText primary="DashBoard Products" />
                                </ListItemButton>
                              </NavLink>

                            </ListItem>
                            <ListItem disablePadding>
                              <NavLink as={Link} to="/dashboard/addprducts" className={"text-light"} onClick={handleCloseDashBoard} style={{ textDecoration: "none" }}>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <AddIcon className='text-light' />
                                  </ListItemIcon>
                                  <ListItemText primary="Add Products" />
                                </ListItemButton>
                              </NavLink>

                            </ListItem>
                           
                            
                            <ListItem disablePadding>
                              <NavLink as={Link} to="/dashboard/ordersPage" className={"text-light"} onClick={handleCloseDashBoard} style={{ textDecoration: "none" }}>
                                <ListItemButton>
                                  <ListItemIcon>
                                    < BorderStyleIcon className='text-light' />
                                  </ListItemIcon>
                                  <ListItemText primary="Orders Page" />
                                </ListItemButton>
                              </NavLink>

                            </ListItem>
                            <ListItem disablePadding>
                              <NavLink as={Link} to="/dashboard/usersPage" className={"text-light"} onClick={handleCloseDashBoard} style={{ textDecoration: "none" }}>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <AccountCircleIcon className='text-light' />
                                  </ListItemIcon>
                                  <ListItemText primary="Users" />
                                </ListItemButton>
                              </NavLink>

                            </ListItem>
                            <ListItem disablePadding>
                              <NavLink as={Link} to="/dashboard/addAdminUser" className={"text-light"} onClick={handleCloseDashBoard} style={{ textDecoration: "none" }}>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <AddIcon className='text-light' />
                                  </ListItemIcon>
                                  <ListItemText primary="Add Users" />
                                </ListItemButton>
                              </NavLink>

                            </ListItem>
                          


                           
                          </List>
                        </Offcanvas.Body>
                      </Offcanvas>

                    </Nav.Link>) : ("")}

                  </li>) : ("")}


                  <div >
                    <li className="nav-item " >
                      <Nav.Link className=' text-light' as={Link} to="/addedproducts" onClick={handleClose1}>
                        <div className='position-relative'>
                          <div>
                            < MdShoppingCart className='fs-4 ' />
                            <span className='fw-bold position-absolute   top-0 me-1 px-1 ' style={{ backgroundColor: "white ", borderRadius: "100%", color: "orange" }}>{loading === true ? '' : cartArray.length}</span>

                          </div>




                        </div>

                      </Nav.Link>

                    </li>

                  </div>


                </ul>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <>


              <NavLink onClick={handleShow} style={{ color: "white" }}><FaSearch className='fs-5' /></NavLink>

              <Modal show={show1} onHide={handleClose} >

                <Modal.Body >
                <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '100%' },

                }}
                noValidate
                autoComplete="off"
                className='mt-5    '
                onSubmit={handelSearch}

            >

                <TextField  className='shadow-lgshadow-lg p-3 mb-5 bg-body-tertiary rounded input' name="" id=""placeholder='Search with Products' InputProps={{
                        startAdornment: <InputAdornment position="start">< SearchIcon/></InputAdornment>,
                      }}  

                      value={name}
                        onChange={(e) => setName(e.target.value)}
                      sx={{

                        ".MuiOutlinedInput-root":{
                           input:{
                             color:"gray",
                             fontFamily:"monospace"
                           },
                           fieldset:{
                             border:"1px solid gray !important"
                           }
                        }
                     }} />
            </Box>
                </Modal.Body>

              </Modal>
            </>

          </Container>
        </Navbar>
      ))}


    </div>

  )
}

export default Header
