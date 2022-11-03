import { Container, Row, Col } from 'react-bootstrap'

export const Footer = () => {
  return (
    <>
      <footer className='bg-dark dark' >
        <Container>
          <Row>
            <Col className='text-center py-3 white'> Copyright &copy; SwimFast </Col>
          </Row>
        </Container>
      </footer>
    </>

  )
}