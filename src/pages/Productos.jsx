import React from "react";
import { Title } from "../components/atoms/Title";
import { ProductList } from "../components/organisms/ProductList";
import "../styles/pages/productos.css";

import cake from "../assets/images/cake.webp";
import trufa from "../assets/images/trufa.webp";
import kanye from "../assets/images/kanye.webp";
import tortaRosa from "../assets/images/tortaRosa.webp";
import TartaCeleste from "../assets/images/TartaCeleste.webp";
import TartaBlanca from "../assets/images/tartaBlanca.webp";
import ShrekCake from "../assets/images/ShrekCake.webp";
import programmerCake from "../assets/images/programmer-cake.webp";

export const Productos = () => {
  const productos = [
    { id: 1, nombre: "Dulce Tarde", precio: 6500, imagen: cake },
    { id: 2, nombre: "Trufa", precio: 5500, imagen: trufa },
    { id: 3, nombre: "Kanye Cake", precio: 7200, imagen: kanye },
    { id: 4, nombre: "Dulce Rosa", precio: 6800, imagen: tortaRosa },
    { id: 5, nombre: "Tarta Celeste", precio: 7000, imagen: TartaCeleste },
    { id: 6, nombre: "Tarta Blanca", precio: 6200, imagen: TartaBlanca },
    { id: 7, nombre: "Papu Cake", precio: 7500, imagen: programmerCake },
    { id: 8, nombre: "Shrek Cake", precio: 8000, imagen: ShrekCake },
  ];

  return (
    <main className="container mt-5 productos-page">
      <Title text="Nuestros Productos" />
      <ProductList productos={productos} />
    </main>
  );
};