import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userAction'


export const Header = () => {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <header>
        <Navbar bg="dark" expand="lg" collapseOnSelect variant='dark'>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand><span className='lh-primary'><i className="fa-solid fa-person-drowning fa-2x"></i> Swim</span>Fast</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href='http://swimfast-app.herokuapp.com/'><i className="fa-solid fa-person-drowning"></i> Reserva</Nav.Link>
                <LinkContainer to={'/cart'}>
                  <Nav.Link><i className='fas fa-shopping-cart'></i> Carro</Nav.Link>
                </LinkContainer>

                {userInfo ? (
                  <NavDropdown title={userInfo.first_name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Perfil</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Salir</NavDropdown.Item>

                  </NavDropdown>

                ) :

                  <LinkContainer to={'/login'}>
                    <Nav.Link><i className='fas fa-user'></i> Iniciar Sesión</Nav.Link>
                  </LinkContainer>

                }


              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  )
}