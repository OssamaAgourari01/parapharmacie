import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './Components/navbar/Navbar'
import Footer from './Components/navbar/Footer'
import Main from './Components/MainSection/Main'
import axios from 'axios'
import ListProduits from './Components/ListProduits/ListProduits';
import Individual from './Components/ListProduits/Individual';
import Cart from './Components/listing/Cart';
import Favorites from './Components/listing/Favorites';
import ShowDetails from './Components/ListProduits/ShowDetails';
import MainSection from './Components/MainSection/MainSection';
import CartShop from './Components/listing/CartShop';
import Listing from './Components/ListProduits/listing';

function App() {
  const [produits, setProduits] = useState([])
  const [cart, setCart] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8800/produits');
          setProduits(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
  
  const [favorites, setFavorites] = useState([])
  return (
    <BrowserRouter>
      <Navbar produits={produits} cart={cart}/>
        <Routes>
          <Route path='/' exact element={<MainSection/>}/>
          {/* <Route path='/cart' element={<Cart produits={produits} cart={cart} setcart={setCart}/>}/> */}
          <Route path='/cart' element={<CartShop produits={produits} cart={cart} setcart={setCart}/>}/>
          <Route path='/listing' element={<Listing  produits={produits} setfavorites={setFavorites} favorites={favorites} cart={cart} setcart={setCart}/>}/>
          <Route path='/favorites' element={<Favorites produits={produits} favorites={favorites} setfavorites={setFavorites}/>}/>
          <Route path='/produit' element={<Main produits={produits}/>}/>
          <Route path='/produit/:id' element={produits.length > 0 && <Individual produits={produits} setfavorites={setFavorites} favorites={favorites} cart={cart} setcart={setCart} />}/>
          <Route path='/details/:id' element={produits.length > 0 && <ShowDetails produits={produits}/>}/>

        </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
