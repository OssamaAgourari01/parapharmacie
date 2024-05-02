import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Individual from './Individual';
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { MdHourglassEmpty } from "react-icons/md";

function ListProduits(props) {
  return (
    <div className="container">
      <div className="row">
        {props.produits == [] ? <h1>Nothing yet</h1> : props.produits.map(product => (
          <div key={product.id} className="col-lg-3 col-md-6 mb-4">
            <div className="card h-100">
              <img
                className="card-img-top"
                src={`Produits/${product.type}/${product.src}`}
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <h5>{product.price} DH</h5>
              </div>
              <div className="card-footer" style={{textAlign : "center",backgroundColor: "#145843"}}>
                <button className="btn btn-success mx-3"><CiShoppingCart/></button>
                <button className="btn btn-success"><CiHeart/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListProduits
