import { useState } from 'react'
import { Link } from 'react-router-dom';
import "./listing.css"
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { GrValidate } from "react-icons/gr";

import { Modal, Button } from 'react-bootstrap';

function Listing(props) {

    const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
    const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item

    const handleAddToCart = (item) => {
        // Perform the action to add to cart
        setSelectedItem(item); // Set the selected item
        setShowModal(true); // Show the modal
    }

    const handleContinue = () => {
        setShowModal(false); // Hide the modal
        // Continue navigating or any other action
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const selectedList = props.produits.slice(0, 10)
    const handleclickfav = (id) => {
        const item = props.produits.find(ele => ele.id == id)
        if (props.favorites.indexOf(item) == -1) {
            props.setfavorites([...props.favorites, item])
        }
    }
    const handleclickcart = (id) => {
        const item = props.produits.find(ele => ele.id == id)
        if (props.favorites.indexOf(item) == -1) {
            props.setcart([...props.cart, item])
        }
    }
    const [element, setElement] = useState({})
    return (
        <div>
            <Carousel swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerclassNameName="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListclassName="custom-dot-list-style"
                itemclassName="carousel-item-padding-40-px">
                {
                    selectedList.map(ele => {
                        const truncatedTitle = ele.title.length > 25 ? ele.title.substring(0, 25) + "..." : ele.title;
                        return (
                            <div className="card my-3" >
                                <img src={`${process.env.PUBLIC_URL}/Produits/${ele.type}/${ele.src}`} className="card-img-top" />
                                <div className="card-body">
                                    <p className="card-title">{truncatedTitle}</p>
                                    <p className="card-text text-center">{ele.price} DHS</p>
                                    <a href="#" className="btn btn-outline-dark">Add to cart</a>
                                    <a href="#" className="btn btn-outline-dark mx-2">Favorite</a>
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>
            <>
                {
                    selectedList.map(ele => (
                        <div className='card product-card' style={{ width: "15rem" }} key={ele.id}>
                            <div className='product-link'>
                                <button className="btn btn-outline-dark my-3" onClick={() => handleAddToCart(ele)}>
                                    <CiShoppingCart />
                                </button><br />
                                <button to="/favourites" className="btn btn-outline-dark">
                                    <CiHeart />
                                </button>
                            </div>
                            <img src={`${process.env.PUBLIC_URL}/Produits/face/${ele.src}`} className="card-img-top" alt="Product" />
                            <div className="card-body">
                                <p className="card-title">{ele.title.length > 25 ? ele.title.substring(0, 25) + "..." : ele.title }</p>
                                <p className="card-text text-center"> <b>{ele.price}DHs</b></p>
                            </div>
                        </div>
                    ))
                }

                {/* Modal for confirming action */}
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
                                        <b>Produit ajouté au panier avec succéss</b>
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
                                                            <button className="btn btn-primary">Continuer mes achat</button>
                                                        </div>
                                                        <div className="col-6">
                                                            <button className="btn btn-success">Commander</button>
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
            </>
        </div>
    )
}

export default Listing
