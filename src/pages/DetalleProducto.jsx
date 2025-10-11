import React from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { notifySuccess } from "../components/atoms/Notification";
import "../styles/pages/detalle.css";

import cake from "../assets/images/cake.webp";
import trufa from "../assets/images/trufa.webp";
import kanye from "../assets/images/kanye.webp";
import tortaRosa from "../assets/images/tortaRosa.webp";
import emoCake from "../assets/images/emoCake.webp";
import TartaCeleste from "../assets/images/TartaCeleste.webp";
import TartaBlanca from "../assets/images/tartaBlanca.webp";
import ShrekCake from "../assets/images/ShrekCake.webp";
import programmerCake from "../assets/images/programmer-cake.webp";

export const DetalleProducto = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CartContext);

  const productos = [
    { id: 1, nombre: "Dulce Tarde", precio: 6500, descripcion: "Bizcocho de chocolate relleno con frutos rojos y crema batida artesanal.", imagen: cake },
    { id: 2, nombre: "Trufa", precio: 5500, descripcion: "Pequeña delicia cubierta de cacao con relleno de ganache suave.", imagen: trufa },
    { id: 3, nombre: "Kanye Cake", precio: 7200, descripcion: "Torta especial con diseño moderno, suave bizcocho de vainilla y crema de frutilla.", imagen: kanye },
    { id: 4, nombre: "Dulce Rosa", precio: 6800, descripcion: "Bizcocho de vainilla con crema de frambuesa y glaseado rosa.", imagen: tortaRosa },
    { id: 5, nombre: "Tarta Celeste", precio: 7000, descripcion: "Delicada tarta de crema celeste con decoración artesanal.", imagen: TartaCeleste },
    { id: 6, nombre: "Tarta Blanca", precio: 6200, descripcion: "Tarta clásica con cobertura blanca y toque de coco.", imagen: TartaBlanca },
    { id: 7, nombre: "Papu Cake", precio: 7500, descripcion: "Torta geek con código binario y diseño moderno.", imagen: programmerCake },
    { id: 8, nombre: "Shrek Cake", precio: 8000, descripcion: "Torta verde divertida inspirada en el ogro favorito de todos.", imagen: ShrekCake },
  ];


  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <main className="container text-center mt-5">
        <h1 className="titulo">Producto no encontrado</h1>
        <Link to="/productos">
          <button className="btn btn-primary mt-3">Volver a Productos</button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mt-5 detalle-producto">
      <div className="card producto-card mx-auto p-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded" />
          </div>
          <div className="col-md-6 text-start">
            <h2 className="titulo mb-3">{producto.nombre}</h2>
            <p className="descripcion">{producto.descripcion}</p>
            <h4 className="precio">Precio: ${producto.precio.toLocaleString()}</h4>
            <button
              className="btn btn-primary mt-4 w-100"
              onClick={() => {
                agregarAlCarrito(producto);
                notifySuccess(`${producto.nombre} agregado al carrito`);
              }}
            >
              Agregar al carrito
            </button>
            <Link to="/productos" className="btn btn-outline-primary mt-3 w-100">
              ← Volver a Productos
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};