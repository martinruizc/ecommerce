import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartAction'
import { Cupon } from '../components/Cupon'
import { numberWithCommas } from './helpers/numberComm'



export const CartScreen = ({ match, lacation, history }) => {
  const params = useParams()
  const navigate = useNavigate()
  const productId = params.id


  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart


  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }

  }, [dispatch, productId, qty])

  const checkoutHandler = () => {
    navigate('/login?redirect=sipping')
  }

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Tus compras</h1>
          {cartItems.length === 0
            ? <Message variant='red'>Carro Vacío</Message>
            : (
              <ListGroup variant='flush'>
                {cartItems.map(item => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>{item.name}</Col>
                      <Col md={2}><span className='lh-primary'>$</span>{item.price}</Col>
                      <Col md={3}>
                        <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>

                          {[...Array(item.countInStock).keys()].map(x => (
                            <option key={x + 1}>{x + 1}</option>
                          ))}
                        </Form.Control>
                      </Col>

                      <Col md={2}>
                        <Button
                          type='button'
                          variant='light'
                          onClick={() => removeItemHandler(item.product)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
        </Col>
        <Col md={4}>
          <Card className='bg-light'>
            <ListGroup.Item>
              <h3>
                Productos ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h3>
              <h4>Total: ${numberWithCommas(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))}</h4>

            </ListGroup.Item>
            <ListGroup.Item>
              <Cupon />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Pagar
              </Button>
            </ListGroup.Item>
          </Card>

        </Col>
      </Row>

      <Button className='button'>
        <Link to={'/'}>Seguir comprando</Link>
      </Button>
    </>
  )




}