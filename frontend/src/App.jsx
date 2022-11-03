import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { HomeScreen } from "./screens/HomoScreen"
import { ProductScreen } from "./screens/ProductScreen"


export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  )
}