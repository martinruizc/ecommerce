import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components/Message'
import { Loading } from '../components/Loading'
import { login } from '../actions/userAction'
import { FormContainer } from "../components/FormContainer"


export const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate();


  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = useLocation.search ? useLocation.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }

  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }


  return (
    <FormContainer>
      <h1>Iniciar Sesión</h1>
      {error && <Message variant={'danger'}>{error}</Message>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Correo Electónico</Form.Label>
          <Form.Control type='email' placeholder='Ingrese su correo' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type='password' placeholder='Ingrese su contraseña' value={password} onChange={(e) => setPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3'>
          Ingresar
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          ¿Nuveo aquí? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Regístrese</Link>
        </Col>
      </Row>

    </FormContainer >
  )


}
