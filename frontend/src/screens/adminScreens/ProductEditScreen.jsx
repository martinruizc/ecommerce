import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer } from '../../components/FormContainer'
import { Message } from '../../components/Message'
import { Loading } from '../../components/Loading'
import { updateProduct, listProductDetails } from '../../actions/productAction'
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants"


export const ProductEditScreen = () => {

  const params = useParams()
  const productId = params.id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)


  const [uploading, setUploading] = useState(false)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
        setPrice(product.price)
        setCountInStock(product.countInStock)
      }
    }

  }, [dispatch, navigate, productId, product, successUpdate])


  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)


    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)

    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: product._id,
      name,
      image,
      brand,
      category,
      price,
      countInStock,
      description,
    }))
  }




  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-2'>
        Atrás
      </Link>
      <FormContainer>
        <h1>Editar Producto</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loading />
          : error
            ? <Message variant='danger'>{error}</Message>
            : (

              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className="mb-2">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type='text' placeholder='Nombre' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='price' className='mb-2'>
                  <Form.Label>Precio</Form.Label>
                  <Form.Control type='number' placeholder='$ Precio' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>


                <Form.Group controlId='image'>
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control type='text' placeholder='Ingrese su imagen' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>

                  <Form.Group className="mb-3">
                    <Form.Label>Seleccione una imagen</Form.Label>
                    <Form.Control type='file' custom onChange={uploadFileHandler} />
                  </Form.Group>
                  {uploading && <Loading />}
                </Form.Group>

                <Form.Group controlId='brand'>
                  <Form.Label>Marca</Form.Label>
                  <Form.Control type='text' placeholder='Marca' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control type='text' placeholder='Categoría' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock' className='mb-2'>
                  <Form.Label>Número de unidades</Form.Label>
                  <Form.Control type='number' placeholder='Unidades' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control type='text' placeholder='Descripción' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>
                  Actualizar
                </Button>
              </Form>
            )}
      </FormContainer >
    </>
  )
}
