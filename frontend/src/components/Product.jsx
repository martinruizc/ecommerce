import { Card } from "react-bootstrap"
import { Raiting } from './Raiting'
import { Link } from 'react-router-dom'


export const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className="my-3">
            <Raiting value={product.rating} text={`${product.numReviews} Reseñas`} />
          </div>
        </Card.Text>
        <Card.Text as='h3'>$ {product.price}

        </Card.Text>
      </Card.Body>
    </Card>
  )

}