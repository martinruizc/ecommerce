import { useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../../components/Message'
import { Loading } from '../../components/Loading'
import { deleteUser, listUsers } from '../../actions/userAction'
import toast, { Toaster } from 'react-hot-toast'

export const UserListScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, success, userInfo])


  const deleteHandler = (id) => {
    if (window.confirm(`¿Está seguro de eliminar el usuario?`)) {
      toast.success('Usuario Eliminado')
      dispatch(deleteUser(id))

    }
  }


  return (
    <>
      <div><Toaster /></div>
      <h1>Usuarios</h1>
      {loading ? <Loading />
        : error ?
          <Message variant='danger'>error</Message>
          : (

            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                  <th>Admmin</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ?
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                        : <i className='fas fa-times' style={{ color: 'red' }}></i>
                      }
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>


            </Table>

          )
      }
    </>
  )
}
