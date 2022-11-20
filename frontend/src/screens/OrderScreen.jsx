import { useState, useEffect } from "react"
import axios from 'axios'
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from "../components/Message"
import { Loading } from "../components/Loading"
import { getOrderDetails, payOrder } from "../actions/orderAction"
import { ORDER_PAY_RESET } from '../constants/orderConstats'



export const OrderScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const [sdkReady, setSdkReady] = useState(false)

  const orderId = params.id
  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loadins: loadingPay, success: successPay } = orderPay


  console.log(successPay)

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }

  }, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }


  return loading ? <Loading />
    : error
      ? <Message variant='danger'>{error}</Message>
      : <>
        <h1>Orden # {(order._id)}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Entrega</h3>
                <p><strong>Nombre: </strong> {order.user.first_name} {order.user.last_name}</p>
                <p><strong>Correo: </strong>{order.user.email}</p>
                <p>
                  <strong>Dirección:</strong> {order.shippingAddress.address}, {order.shippingAddress.neighboorhood}, {order.shippingAddress.city}, {order.shippingAddress.country}
                </p>
              </ListGroup.Item>


              <ListGroup.Item>
                <h3>Método de Pago</h3>
                <strong>Método: </strong>
                {order.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Estado del Pago</h3>
                {order.isPaid ? <Message variant='success'>Pago recibido el: {order.updatedAt}</Message> : <Message variant='danger'>Aguardando Pago</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Estado</h3>
                {order.isDelivered ? <Message variant='success'>Entregado {order.deliveredAt}</Message> : <Message>Tu orden se está alistando</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Ítems</h3>
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

                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loading />}
                    {!sdkReady ? <Loading /> : (
                      <PayPalButton amount={10} onSuccess={successPaymentHandler} />

                    )}
                  </ListGroup.Item>
                )}

              </ListGroup>
            </Card>
          </Col>

        </Row>
      </>
}

