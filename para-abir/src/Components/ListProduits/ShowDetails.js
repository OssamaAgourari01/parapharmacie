import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import ReactCardSlider from 'react-card-slider-component';
import './show.css';
import Carousel from 'react-multi-carousel';

function ShowDetails(props) {
    const { id } = useParams();
    const [curr, setCurr] = useState({});
    const [currTypeList, setCurrTypeList] = useState([]);
    const [notCurrTypeList, setNotCurrTypeList] = useState([]);
    
    useEffect(() => {
        const item = props.produits.find(ele => ele.id == id);
        setCurr(item);
        const list = props.produits.filter(ele => ele.type == item.type)
        const notlist = props.produits.filter(ele => ele.type != item.type).slice(5,22)
        setCurrTypeList(list)
        setNotCurrTypeList(notlist)
    }, [id]);
    const slides = props.produits.filter(el=>el.type == curr.type && el.id != curr.id ).map(ele=>({ image: process.env.PUBLIC_URL + '/Produits/' + ele.type + '/' +  ele.src ,title: ele.title,description: ele.price + " DH" ,clickEvent:''}))
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4
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
    return (
        <div className="product-card">
            <div className="product-details row">
                <div className="product-image col-5">
                    <img src={process.env.PUBLIC_URL + '/Produits/' + curr.type + '/' +  curr.src} alt={curr.title} />
                </div>
                <div className="product-info col-7">
                    <h1 className="product-title ">{curr.title}</h1>
                    <h3 className="product-type">{curr.type} product</h3>
                    <hr></hr>
                    <p><b>Description :</b> </p>
                    <p className="product-description">{curr.description}</p><hr/>
                    <h1 className="product-price">{curr.price} DH</h1><hr/>
                    <div className="product-buttons">
                        <button className="add-to-cart-btn">
                            <FaShoppingCart /> Add to Cart
                        </button>
                        <button className="add-to-favorites-btn">
                            Favoriser <FaHeart /> 
                        </button>
                    </div>
                </div>
            </div>
            <div className='container bg-secondary mb-5 p-2'>
            <h1 className='m-5'>Produits Similair</h1>
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
                    currTypeList.map(ele => {
                        const truncatedTitle = ele.title.length > 25 ? ele.title.substring(0, 25) + "..." : ele.title;
                        return (
                            <div className="card my-3 mx-1" >
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
            </div>
            <div className='container bg-secondary mb-2'>
            <h1 className='m-5'>Produits Similair</h1>
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
                    notCurrTypeList.map(ele => {
                        const truncatedTitle = ele.title.length > 25 ? ele.title.substring(0, 25) + "..." : ele.title;
                        return (
                            <div className="card my-3 mx-1" >
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
            </div>
        </div>
    );
}

export default ShowDetails;
