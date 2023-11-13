import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Buyproduct } from "./pages/Buyproduct"
import { AddCustomerInfo } from "./pages/AddCustomerInfo"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/buyproduct" element={<Buyproduct />} />
          <Route path="/addcustomerinfo" element={<AddCustomerInfo/>} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
