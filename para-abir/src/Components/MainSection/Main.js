import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './main.css'
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

export default function Main(props) {
  console.log(props.produits)
  return (
    <div className="container">
      <div className="row">
        {props.produits.map(product => {
          const truncatedTitle = product.title.length > 25 ? product.title.substring(0, 25) + "..." : product.title;
          return (
          <div key={product.id} className="col-lg-3 col-md-6 mb-4">
            <div className="card h-100">
              <Link to={`/details/${product.id}`}><img
                className="card-img-top"
                src={`Produits/${product.type}/${product.src}`}
                alt={product.title}
              /></Link>
              <div className="card-body">
                <h5 className="card-title" style={{textAlign :"center"}}>{truncatedTitle}</h5>
                <h5 className='pricing'><b>{product.price} DH</b></h5>
              </div>
              <div className="card-footer" style={{textAlign : "center",backgroundColor: "#145843"}}>
                <button className="btn btn-success mx-3"><CiShoppingCart/></button>
                <button className="btn btn-success"><CiHeart/></button>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}
