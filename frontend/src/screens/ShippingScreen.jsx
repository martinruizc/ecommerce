import { useState } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer } from "../components/FormContainer"
import { saveShippingAddress } from "../actions/cartAction"
import { CheckoutSteps } from "../components/CheckoutSteps"


export const ShippingScreen = () => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart



  const [address, setAddress] = useState(shippingAddress.address)
  const [addressDetail, setAddressDetail] = useState(shippingAddress.addressDetail)
  const [city, setCity] = useState(shippingAddress.city)
  const [neighboorhood, setNeighboorhood] = useState(shippingAddress.neighboorhood)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatach = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatach(saveShippingAddress({ address, addressDetail, city, neighboorhood, country }))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Detalles del envío</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className="mb-2">
          <Form.Label>Dirección</Form.Label>
          <Form.Control type='text' required placeholder='Ingrese su dirección' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='addresDetail' className="mb-2">
          <Form.Label>Detalle de la dirección (Apartamento - Callejón)</Form.Label>
          <Form.Control type='text' placeholder='Detalles de la dirección' value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)}></Form.Control>
        </Form.Group>


        <Form.Group controlId='country' className="mb-2">
          <Form.Label>País</Form.Label>
          <Form.Control type='text' required placeholder='Colombia' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className="mb-2">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control type='city' required placeholder='Cali' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='hood' className="mb-2">
          <Form.Label>Barrio</Form.Label>
          <Form.Control type='text' placeholder='Limonares' value={neighboorhood} onChange={(e) => setNeighboorhood(e.target.value)}></Form.Control>
        </Form.Group>


        <Button type='submit' variant='primary' className='my-3'>
          <i className='fa-solid fa-arrow-right'></i> Siguiente
        </Button>

      </Form>


    </FormContainer >
  )
}

