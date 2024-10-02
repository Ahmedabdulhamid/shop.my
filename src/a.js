<nav className="navbar navbar-expand-md navbar-light text-light fixed-top " style={{ background: "black" }}>
<Container>

  <NavLink className="navbar-brand" as={Link} to="/" onClick={handleNavClick}>
    <span className='fw-bold fs-3 text-light'>Shop.</span>
    <span className="fw-bold fs-3" style={{ color: "white" }}>My</span>
  </NavLink>
  <button
    className="navbar-toggler"
    type="button"
    onClick={() => setShow(!show)}
  >
    <span className="navbar-toggler-icon text-light" />
  </button>

  <div
    className={`collapse navbar-collapse  ${show ? "show" : ""}`}
    id="navbarCollapse"
  >

    <ul className="navbar-nav m-auto text-light">

      <li className="nav-item">
        <Nav.Link
          onClick={handleNavClick}
          className="nav-link text-light"
          activeClassName="active"
          as={Link}
          exact
          to={'/'}
        >
          <CiHome className='fs-3' />
        </Nav.Link>

      </li>

      <li className="nav-item">

        <Nav.Link className='text-light'><FaRegUserCircle className='fs-3' /></Nav.Link>

      </li>
      <div >
        <li className="nav-item">
          <Nav.Link className='position-relative text-light' as={Link} to='/addedproducts' onClick={handleClose}> < MdShoppingCart className='fs-3 ' onClick={handleNavClick} />
            <span className='fw-bold position-absolute top-0 end-0' >{loading === true ? '' : cartArray.length}</span>

          </Nav.Link>

        </li>

      </div>

    </ul>
  </div>
  <>
              <NavLink onClick={handleShow} style={{ color: "white" }}><FaSearch /></NavLink>

              <Modal show={show1} onHide={handleClose} >
                <Modal.Header closeButton style={{ background: "white" }}>

                </Modal.Header>
                <Modal.Body style={{ background: "black" }}>
                  <Form onSubmit={handelSearch} >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label className='text-light'>search </Form.Label>
                      <Form.Control
                        className='input'
                        type="text"
                        placeholder="search with products"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>



                  </Form>
                </Modal.Body>

              </Modal>
            </>

</Container>

</nav>







{[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => (
  <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
    <Container fluid>
      <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-${expand}`}
        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
            Offcanvas
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
))}