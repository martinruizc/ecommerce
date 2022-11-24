import { useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../../components/Message'
import { Loading } from '../../components/Loading'
import { createProduct, deleteProduct, listProducts } from '../../actions/productAction'
import toast, { Toaster } from 'react-hot-toast'
import { numberWithCommas } from '../helpers/numberComm'
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants"
deleteProduct


export const ProductListScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList


  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete


  const productCreate = useSelector(state => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })


    if (!userInfo.isAdmin) {
      navigate('/login')

    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [dispatch, navigate, userInfo, successCreate, createdProduct, successDelete])


  const deleteHandler = (id) => {
    if (window.confirm(`¿Está seguro de eliminar el artículo?`)) {
      dispatch(deleteProduct(id))

    }
  }


  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <div><Toaster /></div>
      <Row className="align-items-center">
        <Col>
          <h1>Productos</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i>
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loading />}
      {errorDelete && <Message>{errorDelete}</Message>}
      {loadingCreate && <Loading />}
      {errorCreate && <Message>{errorCreate}</Message>}
      {loading ? <Loading />
        : error ?
          <Message variant='danger'>error</Message>
          : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  {/* <th>Calificación</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{numberWithCommas(product.price)}</td>
                    <td>{product.category}</td>
                    <td>{product.countInStock}</td>
                    {/* <td>{product.rating}</td> */}
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
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
