import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from "../components/Message"
import { CheckoutSteps } from "../components/CheckoutSteps"
import { numberWithCommas } from './helpers/numberComm'
import { createOrder } from "../actions/orderAction"



export const PlaceOrderScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)

  //Operations Cost
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

  cart.shippingPrice = cart.itemsPrice > 150000 ? 0 : 10800

  cart.taxPrice = cart.itemsPrice * 0.19

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/orders/${order._id}`)
    }

  }, [navigate, success])

  const palceOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      paymentMethod: cart.paymentMethod,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }))
  }









  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Envío</h2>
              <p>
                <strong>Dirección:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.neighboorhood}, {cart.shippingAddress.city}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>


            <ListGroup.Item>
              <h2>Método de Pago</h2>
              <strong>Método: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Orden</h2>
              {cart.cartItems.length === 0 ? <Message>Nada aquí</Message>
                : (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>#{index + 1}</Col>
                          <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x {item.price} = $ {item.price * item.qty}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
            </ListGroup.Item>
          </ListGroup>
        </Col>


        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Detalle de la Orden</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Envío</Col>
                  <Col>{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Impuestos</Col>
                  <Col>{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total a pagar</Col>
                  <Col>COP ${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error &&
                  <Message variant='danger' >{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  // diabled={cart.cartItems === 0}
                  onClick={palceOrderHandler}
                >
                  Pagar
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

      </Row>
    </>
  )
}

