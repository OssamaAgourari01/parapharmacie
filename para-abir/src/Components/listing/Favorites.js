import React from 'react'
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { GiEmptyHourglass } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import "./favorites.css"

function Favorites(props) {
  const handleclickung = (id) => {
    const item = props.produits.find(ele => ele.id === id);
    props.setfavorites(props.favorites.filter(ele => ele !== item));
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className='m-2'>Favorites</h2>
        <hr/>
        {props.favorites.length === 0 ? (
          <div className="col-12 fav-none">
            <p><GiEmptyHourglass className='fav-icon'/></p>
            <span>Il n'y a plus d'articles dans votre favorite..</span>
          </div>
        ) : (
          props.favorites.map(product => (
            <div key={product.id} className="col-lg-3 col-md-6 mb-4">
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src={`Produits/${product.type}/${product.src}`}
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center" }}>{product.title}</h5>
                  <h5 className='pricing'><b>{product.price} DH</b></h5>
                </div>
                <div className="card-footer" style={{ textAlign: "center", backgroundColor: "#145843" }}>
                  <button className="btn btn-success mx-3"><CiShoppingCart /></button>
                  <button className="btn btn-success" onClick={() => handleclickung(product.id)}><CiHeart /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;

