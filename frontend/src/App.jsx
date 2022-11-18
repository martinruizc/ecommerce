import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { HomeScreen } from "./screens/HomoScreen"
import { ProductScreen } from "./screens/ProductScreen"
import { CartScreen } from './screens/CartScreen'
import { LoginScreen } from "./screens/LoginScreen"
import { RegisterScreen } from "./screens/RegisterScreen"
import { ProfileScreen } from './screens/ProfileScreen'
import { ShippingScreen } from "./screens/ShippingScreen"



export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  )
}