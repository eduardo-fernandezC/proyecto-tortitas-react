import React from "react";
import { Button } from "../atoms/Button";
import { Title } from "../atoms/Title";
import { Link } from "react-router-dom";
import "../../styles/components/molecules/productcard.css";

export const ProductCard = ({ id, nombre, precio, imagen }) => {
  return (
    <div className="product-card shadow-sm">
      <div className="product-image">
        <img src={imagen} alt={nombre} />
      </div>

      <div className="product-body">
        <Title text={nombre} size="h4" />
        <p className="text-muted">Precio: ${precio.toLocaleString()}</p>
        <Link to={`/detalle/${id}`}>
          <Button text="Ver detalle" className="w-100" />
        </Link>
      </div>
    </div>
  );
};