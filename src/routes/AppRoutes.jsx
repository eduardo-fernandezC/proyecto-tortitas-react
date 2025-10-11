import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Productos } from "../pages/Productos";
import { DetalleProducto } from "../pages/DetalleProducto";
import { Contacto } from "../pages/Contacto";
import { Blog } from "../pages/Blog";
import { Login } from "../pages/Login";
import { Registro } from "../pages/Registro";
import { Carrito } from "../pages/Carrito";
import { Checkout } from "../pages/Checkout";
import { Confirmacion } from "../pages/Confirmacion";
import { Header } from "../components/organisms/Header";
import { Footer } from "../components/organisms/Footer";

export const AppRoutes = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/detalle/:id" element={<DetalleProducto />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirmacion" element={<Confirmacion />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);