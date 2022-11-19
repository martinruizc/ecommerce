import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from "../components/Message"
import { Loading } from "../components/Loading"
import { numberWithCommas } from './helpers/numberComm'
import { getOrderDetails } from "../actions/orderAction"



export const OrderScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const orderId = params.id
  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [])


  return loading ? <Loading />
    : error
      ? <Message variant='danger'>{error}</Message>
      : <>
        <h1>Orden # {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Envío</h2>
                <p>
                  <strong>Dirección:</strong> {order.shippingAddress.address}, {order.shippingAddress.neighboorhood}, {order.shippingAddress.city}, {order.shippingAddress.country}
                </p>
              </ListGroup.Item>


              <ListGroup.Item>
                <h2>Método de Pago</h2>
                <strong>Método: </strong>
                {order.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Orden</h2>
                {order.orderItems.length === 0 ? <Message>Nada aquí</Message>
                  : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
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
                    <Col>{order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Envío</Col>
                    <Col>{order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Impuestos</Col>
                    <Col>{order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total a pagar</Col>
                    <Col>COP ${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>


              </ListGroup>
            </Card>
          </Col>

        </Row>
      </>
}

