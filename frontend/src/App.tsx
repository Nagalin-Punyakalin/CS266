import { Routes, Route } from "react-router-dom"
import { Container, Nav } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { BuyProduct } from "./pages/Buyproduct"
import { AddCustomerInfo } from "./pages/AddCustomerInfo"
import { AddProduct } from "./pages/AddProduct"
import { Login } from "./pages/Login"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { AuthProvider } from "./context/AuthContext"
import { MyStore } from "./pages/MyStore"
import Protected from "./components/Protected"

function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Protected/>}>

          <Route element={<Navbar />}>
          <Route path="/homepage" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/buyproduct" element={<BuyProduct />} />
          <Route path="/addcustomerinfo" element={<AddCustomerInfo/>} />
          <Route path="/addproduct" element={<AddProduct/>} />
          </Route>
        </Route>
        </Routes>
      </ShoppingCartProvider>
    </AuthProvider>
  )
}

export default App