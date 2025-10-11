import React from "react";
import { CarouselHome } from "../components/organisms/CarouselHome";
import "../styles/pages/home.css";

import cake from "../assets/images/cake.webp";
import trufa from "../assets/images/trufa.webp";
import kanye from "../assets/images/kanye.webp";
import tortaRosa from "../assets/images/tortaRosa.webp";
import emoCake from "../assets/images/emoCake.webp";

export const Home = () => {
  const images = [
    { src: cake, title: "Dulce Tarde" },
    { src: trufa, title: "Trufa" },
    { src: kanye, title: "Kanye Cake" },
    { src: tortaRosa, title: "Dulce Rosa" },
    { src: emoCake, title: "Ojitos Dulces" },
  ];

  return (
    <main className="container text-center mt-5">
      <h1 className="titulo home-title">Productos Destacados</h1>
      <CarouselHome images={images} />
    </main>
  );
};