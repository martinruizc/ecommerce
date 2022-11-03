import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Raiting } from '../components/Raiting'
import { listProductDetails } from '../actions/productAction'
import { Loading } from '../components/Loading'
import { Message } from '../components/Message'


export const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const params = useParams()

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch, match])


  return (
    <>
      <Link className='btn btn-light my-3' to={'/'}>Go Back</Link>


      {loading ? <Loading />
        : error ? <Message variant='danger'>{error}</Message>
          : (
            <Row>
              <Col md={6}>
                <Image src={product.image} fluid></Image>
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>{product.name}</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Raiting value={product.rating} text={`${product.numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: ${product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Precio
                        </Col>
                        <Col><strong>{product.price}</strong></Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Estado:
                        </Col>
                        <Col>{product.countInStock > 0 ? 'Disponible' : 'Agotado'}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Agregar</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row >
          )
      }
    </>
  )
}