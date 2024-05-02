import React, { useEffect, useState } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { Link, useParams } from 'react-router-dom';
import './individual.css';
import { Modal } from 'react-bootstrap';
import { GrValidate } from "react-icons/gr";

function Individual(props) {
  const [showModal, setShowModal] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null);
  const { id } = useParams();
  const uniqueTypes = [...new Set(props.produits.map(ele => ele.marque))];
  const uniqueT = [...new Set(props.produits.map(ele => ele.type))];
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 800 }); // State for storing the selected price range
  const [selectedBrand, setSelectedBrand] = useState("");
  const filterByBrand = (product) => {
    return selectedBrand === "" || product.marque === selectedBrand;
  };
  useEffect(() => {
    const filtered = props.produits.filter(product => {
      return product.type === id && filterByPrice(product) && filterByBrand(product);
    });

    setFilteredProducts(filtered);
  }, [id, priceRange, selectedBrand]);

  // Function to check if the product's price falls within the selected price range
  const filterByPrice = (product) => {
    const productPrice = parseInt(product.price);
    return productPrice >= priceRange.min && productPrice <= priceRange.max;
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange({ ...priceRange, [event.target.name]: parseInt(event.target.value) });
  };

  const handleclickcart = (id) => {
    const item = props.produits.find(ele => ele.id == id);
    setSelectedItem(item); // Set the selected item
        setShowModal(true); 
    if (props.cart.indexOf(item) === -1) {
      props.setcart([...props.cart, item]);
    }
  };
  const handleclickfav = (id)=>{
    const item = props.produits.find(ele=>ele.id == id)
    if(props.favorites.indexOf(item) == -1 ){
      props.setfavorites([...props.favorites, item])
    }
    if(props.favorites.includes(item) ){
      const newlist = props.favorites.filter(ele=>ele!=item)
      props.setfavorites(newlist)
    }
  }
  const handleBrandFilter = (selectedBrand) => {
    if (selectedBrand === "") {
      // If All Brands is selected, set filteredProducts to all products
      setFilteredProducts(props.produits.filter(product => product.type === id && filterByPrice(product)));
    } else {
      // Filter products by selected brand
      const filteredByBrand = props.produits.filter(product => product.type === id && product.marque === selectedBrand && filterByPrice(product));
      setFilteredProducts(filteredByBrand);
    }
  };
  return (
    <div className="container">
      <h1 className='font-weight-bold'><b>{id.toLocaleUpperCase()}</b> <span style={{color:"black", fontSize :"14px"}}>({filteredProducts.length} produits)</span></h1>
      <hr />
      <div className="row">
        <div className="col-lg-2" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Filter Options */}
          <h3 className='text-secondary'>Filtrer par :</h3><hr/>
          <div>
            <h3>Marque</h3>
            <ul className='listFilter'>
              <li onClick={() => handleBrandFilter("")}>All Brands</li>
              {uniqueTypes.map((brand, index) => (
                <li key={index} onClick={() => handleBrandFilter(brand)}>{brand}</li>
              ))}
            </ul>
          </div>
          <div>
          <h3>Category</h3>
          <ul className='listFilter'>
              {uniqueT.map((type, index) => (
                <li key={index}><Link className='typeLinks' to={`/produit/${type}`}>{type.toLocaleUpperCase()}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Prix</h3>
            {/* Price Range Filter */}
            <div>
              <label htmlFor="minPrice">Min Prix: <b>{priceRange.min} DHS</b> </label>
              <input type="range" id="minPrice" name="min" min="0" max="800" value={priceRange.min} onChange={handlePriceRangeChange} />
            </div>
            <div>
              <label htmlFor="maxPrice">Max Prix: <b>{priceRange.max} DHS</b> </label>
              <input type="range"  id="maxPrice" name="max" min="0" max="800" value={priceRange.max} onChange={handlePriceRangeChange} />
            </div>
          </div>

          {/* Empty div to fill remaining height */}
          <div style={{ flexGrow: 1 }}></div>
        </div>
        <div className='col-lg-10 col-md-6 mb-4 row'>
          {filteredProducts.map(product => {
            const truncatedTitle = product.title.length > 25 ? product.title.substring(0, 25) + "..." : product.title;
            return (
              <div key={product.id} className="col-lg-3 col-md-6 mb-4 ">
                <div className="card  mainCart">
                  <Link to={`/details/${product.id}`}>
                    <img
                      className="card-img-top"
                      src={`${process.env.PUBLIC_URL}/Produits/${id}/${product.src}`}
                      alt={product.title}
                    />
                  </Link>
                  <button className={ props.favorites.includes(product) ? "text-dark btn favbtn btn-success" : "btn favbtn "} onClick={()=>handleclickfav(product.id)}><CiHeart /></button>
                  <div className="card-body">
                    <p className="card-title">{truncatedTitle}</p>
                    <h5 className='text-center'><b style={{ color: "#145843" }}>{product.price} DHS</b></h5>
                  </div>
                  <div className="card-footer" style={{ textAlign: "center" }}>
                    <button className="btn mx-2 pann" onClick={() => handleclickcart(product.id)}>J'ACHETE! <CiShoppingCart style={{ fontSize: "25px", fontWeight: "bolder" }} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-80w">
                    {selectedItem && (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm la commande</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div class="alert alert-success d-flex align-items-center" role="alert">
                                    <GrValidate class="bi flex-shrink-0 me-2" role="img" aria-label="Success:" />
                                    <div>
                                        <h3>Produit ajouté au panier avec succéss</h3>
                                    </div>
                                </div>

                                <div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="card my-3">
                                                <div className="row no-gutters">
                                                    <div className="col-md-4">
                                                        <img src={`${process.env.PUBLIC_URL}/Produits/${selectedItem.type}/${selectedItem.src}`} className="card-img" alt={selectedItem.title} />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body">
                                                            <h5 className="card-title">{selectedItem.title}</h5>
                                                            <p className="card-text text-center text-success"><b>{selectedItem.price} DHs</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card my-3">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <p>sous-Prix:</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p><b>{selectedItem.price} DHs</b></p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <p>Prix Total:</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p><b>{selectedItem.price} DHs</b></p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <button className="btn btn-primary" onClick={() => setShowModal(false)}>Continuer mes achat</button>
                                                        </div>
                                                        <div className="col-6">
                                                            <Link to="/cart"><button className="btn btn-success">Commander</button></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </>
                    )}
                </Modal>
      </div>
    </div>
  );
}

export default Individual;
