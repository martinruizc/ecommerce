import { Form } from "react-bootstrap"

export const Cupon = () => {
  return (
    <Form.Group className='block'>
      <Form.Label>Código de descuento</Form.Label>
      <Form.Control type='text' placeholder='Ingresa un cupón' />
    </Form.Group>

  )
}