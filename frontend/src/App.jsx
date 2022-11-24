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
import { PaymentScreen } from "./screens/PaymentScreen"
import { PlaceOrderScreen } from "./screens/PlaceOrderScreen"
import { OrderScreen } from "./screens/OrderScreen"
import { UserListScreen } from "./screens/adminScreens/UserListScreen"
import { UserEditScreen } from "./screens/adminScreens/UserEditScreen"
import { ProductListScreen } from "./screens/adminScreens/ProductListScreen"
import { ProductEditScreen } from './screens/adminScreens/ProductEditScreen'
import { OrderListScreen } from "./screens/adminScreens/OrderListScreen"


export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/admin/userList" element={<UserListScreen />} />
            <Route path="/admin/productList" element={<ProductListScreen />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  )
}