import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import "../../styles/components/organisms/header.css";

export const Header = () => {
  const [logueado, setLogueado] = useState(false);
  const navigate = useNavigate();
  const { carrito } = useContext(CartContext);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) setLogueado(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setLogueado(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold text-white" to="/">
          TORTITAS.CL
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link className="nav-link text-white" to="/"><span className="material-symbols-outlined">home</span>Inicio</Link>
          <Link className="nav-link text-white" to="/productos"><span className="material-symbols-outlined">storefront</span>Productos</Link>
          <Link className="nav-link text-white" to="/blog"><span className="material-symbols-outlined">article</span>Blog</Link>
          <Link className="nav-link text-white" to="/contacto"><span className="material-symbols-outlined">mail</span>Contacto</Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <Link to="/carrito" className="text-white position-relative">
            <span className="material-symbols-outlined">shopping_cart</span>
            {carrito.length > 0 && (
              <span className="badge bg-light text-danger cart-badge">
                {carrito.reduce((acc, p) => acc + p.cantidad, 0)}
              </span>
            )}
          </Link>

          {!logueado ? (
            <Link to="/login" className="btn btn-outline-light fw-bold">Iniciar sesión</Link>
          ) : (
            <button onClick={handleLogout} className="btn btn-light fw-bold text-danger">
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};