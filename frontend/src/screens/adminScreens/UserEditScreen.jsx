import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer } from '../../components/FormContainer'
import { Message } from '../../components/Message'
import { Loading } from '../../components/Loading'
import { getUserDetails, updateUser } from '../../actions/userAction'
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import toast, { Toaster } from 'react-hot-toast'

export const UserEditScreen = () => {
  const params = useParams()
  const userId = params.id

  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails


  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate



  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
      toast.success('Información actualizada')
    } else {
      if (!user.first_name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }

  }, [dispatch, navigate, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, first_name, last_name, email, isAdmin }))
  }


  return (
    <>
      <div><Toaster /></div>
      <Link to='/admin/userlist' className='btn btn-light my-2'>
        Atrás
      </Link>
      <FormContainer>
        <h1>Actualizar Información</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loading />
          : error
            ? <Message variant='danger'>{error}</Message>
            : (

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

                <Form.Group controlId='isAdmin'>
                  <Form.Check type='checkbox' label='¿Es administrador?' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>
                  </Form.Check>
                </Form.Group>


                <Button type='submit' variant='primary' className='my-3'>
                  Actualizar
                </Button>
              </Form>
            )}
      </FormContainer >
    </>
  )
}
