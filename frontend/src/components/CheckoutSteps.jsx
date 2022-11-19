import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Ingresar</Nav.Link>
          </LinkContainer>

        ) : (
          <Nav.Link disabled>Ingresar</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Dirección</Nav.Link>
          </LinkContainer>

        ) : (
          <Nav.Link disabled>Dirección</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Pago</Nav.Link>
          </LinkContainer>

        ) : (
          <Nav.Link disabled>Pago</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/palceorder'>
            <Nav.Link>Orden</Nav.Link>
          </LinkContainer>

        ) : (
          <Nav.Link disabled>Orden</Nav.Link>
        )}
      </Nav.Item>


    </Nav>
  )
}
