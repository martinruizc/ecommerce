import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { HomeScreen } from "./screens/HomoScreen"
import { ProductScreen } from "./screens/ProductScreen"
import { CartScreen } from './screens/CartScreen'
import { LoginScreen } from "./screens/LoginScreen"


export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  )
}