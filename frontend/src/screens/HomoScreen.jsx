import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Product } from '../components/Product'
import { listProducts } from '../actions/productAction'
import { Loading } from '../components/Loading'
import { Message } from '../components/Message'


export const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList


  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])


  return (
    <>
      <h1>Últimos Productos</h1>
      {loading ? <Loading /> : error ? <Message variant='danger'>{error}</Message> : <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>}


    </>
  )
}