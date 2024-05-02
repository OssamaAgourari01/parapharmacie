import React, { useState,useEffect } from 'react'
import { TbShoppingCartOff } from "react-icons/tb";
import { Link } from 'react-router-dom'

function CartShop(props) {
    const [total, setTotal] = useState();
    useEffect(() => {
        let newTotal = 0;
        props.cart.forEach(product => {
            newTotal += product.price * product.qtecart;
        });
        setTotal(newTotal);
    }, [props.cart]);
    const increaseQuantity = (id) => {
        const curr = props.produits.find(ele=>ele.id == id)
        curr.qtecart = curr.qtecart + 1
        setTotal(total + curr.price)
    };

    const decreaseQuantity = (id) => {
        const curr = props.produits.find(ele=>ele.id == id)
        if(curr.qtecart >1){
            curr.qtecart = curr.qtecart - 1
            setTotal(total - curr.price)
        }
        
    };
    const handleclickung = (id) => {
        const item = props.produits.find(ele => ele.id === id);
        item.qtecart = 1
        props.setcart(props.cart.filter(ele => ele !== item));
      };
    return (
        <div>
            <section class="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col">
                            <div class="card">
                                <div class="card-body p-4">

                                    <div class="row">
                                        <div class="col-lg-7">
                                                <Link to="/" class="text-body"><h3 class="mb-3">Continue shopping </h3></Link>
                                            
                                            <hr />

                                            <div class="d-flex justify-content-between align-items-center mb-4">
                                                
                                                <div>
                                                    <p class="mb-1">Shopping cart</p>
                                                    {
                                                    props.cart.length > 0 ?  <p class="mb-0">You have {props.cart.length} items in your cart</p> : <p class="mb-0">Your cart is emptey</p>
                                                    }
                                                </div>
                                            </div>


                                            {
                                                props.cart.map(product => (
                                                    <div className="shadow p-3 mb-5 bg-body-tertiary rounded mb-3 mb-lg-0 my-2">
                                                        <div className="card-body">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div>
                                                                        <img
                                                                            src={`Produits/${product.type}/${product.src}`}
                                                                            className="img-fluid rounded-3"
                                                                            alt="Shopping item"
                                                                            style={{ width: "65px" }}
                                                                        />
                                                                    </div>
                                                                    <div className="ms-3">
                                                                        <span><b>{product.title}</b></span>
                                                                        <p className="small mb-0">{product.type.toUpperCase()} PRODUIT</p>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div className="d-flex align-items-center me-3">
                                                                        <button className="btn btn-sm btn-outline-secondary" onClick={()=>decreaseQuantity(product.id)}>-</button>
                                                                        <span className="mx-2">{product.qtecart}</span>
                                                                        <button className="btn btn-sm btn-outline-secondary" onClick={()=>increaseQuantity(product.id)}>+</button>
                                                                    </div>
                                                                    <button type="button" className="btn mx-2" onClick={() => handleclickung(product.id)}><TbShoppingCartOff /></button>
                                                                    <div style={{ width: "80px" }}>
                                                                        <h5 className="mb-0">{product.price * product.qtecart} DHS</h5>
                                                                    </div>
                                                                    <a href="#!" style={{ color: "#cecece" }}><i className="fas fa-trash-alt"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                        <div class="col-lg-5">

                                            <div class="card bg-primary text-white rounded-3">
                                                <div class="card-body">

                                                    <div class="d-flex justify-content-between">
                                                        <p class="mb-2">Subtotal</p>
                                                        <p class="mb-2">{total} DHS</p>
                                                    </div>

                                                    <div class="d-flex justify-content-between">
                                                        <p class="mb-2">Shipping</p>
                                                        <p class="mb-2">0 DHS</p>
                                                    </div>

                                                    <div class="d-flex justify-content-between mb-4">
                                                        <p class="mb-2">Total (Incl. taxes)</p>
                                                        <p class="mb-2">{total} DHS</p>
                                                    </div>
                                                    

                                                    <button type="button" class="btn btn-info btn-block btn-lg  my-2">
                                                        <div class="d-flex justify-content-between">
                                                            <span className='displayFlex'> Checkout </span>
                                                        </div>
                                                    </button>
                                                    <div class="card mb-4 mb-lg-0">
                                                        <div class="card-body">
                                                            <p><strong>We accept</strong></p>
                                                            <img class="me-2" width="45px"
                                                                src="para-photo/visa.jpg"
                                                                alt="Visa" />
                                                            <img class="me-2" width="45px"
                                                                src="para-photo/master.jpg"
                                                                alt="Mastercard" />
                                                            <img class="me-2" width="45px"
                                                                src="para-photo/paypal.jpg"
                                                                alt="PayPal acceptance mark" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CartShop
