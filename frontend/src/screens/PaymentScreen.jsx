import { useState } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer } from "../components/FormContainer"
import { savePaymentMethod } from "../actions/cartAction"
import { CheckoutSteps } from "../components/CheckoutSteps"


export const PaymentScreen = () => {

  const navigate = useNavigate()
  const dispatach = useDispatch()


  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')


  const submitHandler = (e) => {
    e.preventDefault()
    dispatach(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Método de Pago</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group>
          <Form.Label as='legend'>Seleccione el método:</Form.Label>

          <Col>

            <Form.Check
              type='radio'
              label='Tarjeta Cŕedito o Débito'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}>

            </Form.Check>


            <Form.Check
              type='radio'
              label='Nequi, Daviplata, Efecty '
              id='Nequi'
              name='paymentMethod'
              value='PSE'
              onChange={(e) => setPaymentMethod(e.target.value)}>
            </Form.Check>


            <Form.Check
              type='radio'
              label='PSE'
              id='PSE'
              name='paymentMethod'
              value='PSE'
              onChange={(e) => setPaymentMethod(e.target.value)}>
            </Form.Check>


          </Col>
        </Form.Group>


        <Button
          type='submit'
          variant='primary'
          className='my-3'>
          <i className='fa-solid fa-arrow-right'> </i> Siguiente
        </Button>

      </Form>


    </FormContainer >
  )
}

