import React from "react";
import { useEffect } from "react";
import { Carousel } from "bootstrap";
import "../../styles/components/organisms/carouselhome.css";

export const CarouselHome = ({ images }) => {
  useEffect(() => {
    const element = document.querySelector("#carouselExample");
    if (element) {
      new Carousel(element, { interval: 3000, ride: "carousel", wrap: true, pause: false });
    }
  }, []);

  return (
    <div id="carouselExample" className="carousel slide carousel-container" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map((item, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img src={item.src} alt={item.title} className="d-block w-100 carousel-image" />
            <div className="carousel-caption">
              <h3>{item.title}</h3>
              <a href="/productos" className="btn-carousel">Catálogo completo</a>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};