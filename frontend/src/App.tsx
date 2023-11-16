import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { BuyProduct } from "./pages/Buyproduct"
import { AddCustomerInfo } from "./pages/AddCustomerInfo"
import { AddProduct } from "./pages/AddProduct"
import { Login} from "./pages/Login"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>

    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/buyproduct" element={<BuyProduct />} />
          <Route path="/addcustomerinfo" element={<AddCustomerInfo/>} />
          <Route path="/addproduct" element={<AddProduct/>} />
          <Route path="/login" element={<Login/>} /> 
        </Routes>
      </Container>
    </ShoppingCartProvider>
    </AuthProvider>
  )
}

export default App
