import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components/Message'
import { Loading } from '../components/Loading'
import { register } from '../actions/userAction'
import { FormContainer } from "../components/FormContainer"


export const RegisterScreen = () => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = useLocation.search ? useLocation.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }

  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('La contraseña no coincide')
    }
    else {
      dispatch(register(first_name, last_name, email, password))

    }
  }


  return (
    <FormContainer>
      <h1>Registrarse</h1>
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
          Registrarse
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          ¿Ya tiene una cuenta? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Ingrese</Link>
        </Col>
      </Row>

    </FormContainer >
  )


}
