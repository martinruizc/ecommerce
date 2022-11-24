import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components/Message'
import { Loading } from '../components/Loading'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import toast, { Toaster } from 'react-hot-toast'
import { listOrders } from '../actions/orderAction'



export const ProfileScreen = () => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const orderUserList = useSelector((state) => state.orderList)
  const { orders, loading: loadingOrders, success: successOrders, error: errorOrders } = orderUserList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile


  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.first_name) {
        dispatch(getUserDetails('profile'))
        dispatch(listOrders())
      } else {
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setEmail(user.email)
      }

    }

  }, [dispatch, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('La contraseña no coincide')
    }
    else {
      dispatch(updateUserProfile({ id: user._id, first_name, last_name, email, password }))
      success && toast.success(`Información actualizada, ${first_name}`)
    }
  }


  return <Row>
    <div><Toaster /></div>
    <Col md={3}>
      <h2>Mi cuenta</h2>
      {message && <Message variant={'danger'}>{message}</Message>}
      {error && <Message variant={'danger'}>{error}</Message>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='firstName' className="mb-2">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type='text' placeholder='Juan' value={first_name} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='lastName' className='mb-2'>
          <Form.Label>Apellido</Form.Label>
          <Form.Control type='text' placeholder='Pérez' value={last_name} onChange={(e) => setLastName(e.target.value)}></Form.Control>
        </Form.Group>


        <Form.Group controlId='email'>
          <Form.Label>Correo Electónico</Form.Label>
          <Form.Control type='email' placeholder='Ingrese su correo' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type='password' placeholder='Ingrese su contraseña' value={password} onChange={(e) => setPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>


        <Form.Group controlId='confirmPassword'>
          <Form.Label>Verificar contraseña</Form.Label>
          <Form.Control type='password' placeholder='Confirme  su contraseña' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>



        <Button type='submit' variant='primary' className='my-3'>
          Actualizar
        </Button>
      </Form>


    </Col>
    <Col md={9}>
      <h2>Mis órdenes</h2>
      {loadingOrders ? <Loading /> : errorOrders ? <Message>{errorOrders}</Message>
        : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <td>#</td>
                <td>Fecha</td>
                <td>Total</td>
                <td>Pago</td>
                <td>Entrega</td>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td><Link to={`/order/${order._id}`}>{order._id}</Link></td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  {order.isPaid
                    ? <td>{order.paidAt.substring(0, 10)}</td>
                    : <td>
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                      <Link to={`/order/${order._id}`}> Paga aquí</Link>
                    </td>
                  }

                  {order.isDelivered
                    ? <td>order.deliveredAt</td>
                    : <td><i className='fas fa-times' style={{ color: 'red' }}></i></td>
                  }

                </tr>


              ))}

            </tbody>

          </Table>

        )
      }
    </Col>

  </Row >


}
