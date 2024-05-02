import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from 'react-multi-carousel';

function MainSection(props) {
  // console.log(props.produits)
  // const id = useParams('id')  
  // const [filtredProduits, setFiltredProduits] = useState(["ff"])
  // useEffect(()=>{
  //     const lis = props.produits.filter(ele=>ele.type == id)
  //     setFiltredProduits(lis)
  //     console.log(filtredProduits)
  // },[id])
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
    <div>
      <div className='category container'>
        <h4>Nos prestigieuses marques</h4>
        <Carousel
         swipeable={false}
          draggable={false}
          showDots={false}
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

          <div className='item'>
            <img src={`${process.env.PUBLIC_URL}/sponsors/spo1.webp`} width={120} height={80}/>
          </div>
          <div className='item'>
            <img src={`${process.env.PUBLIC_URL}/sponsors/spo2.jpg`} width={120} height={80}/>
          </div>
          <div className='item'>
            <img src={`${process.env.PUBLIC_URL}/sponsors/spo3.png`} width={120} height={80}/>
          </div>
          <div className='item'>
            <img src={`${process.env.PUBLIC_URL}/sponsors/spo4.jpg`} width={120} height={80}/>
          </div>
          <div className='item'>
            <img src={`${process.env.PUBLIC_URL}/sponsors/spo5.webp`} width={120} height={80}/>
          </div>
          <div className='item'>
            <img src={`${process.env.PUBLIC_URL}/sponsors/spo6.png`} width={120} height={80}/>
          </div>
          <div className='item'>
            <img src={`${process.env.PUBLIC_URL}/sponsors/spo7.png`} width={120}/>
          </div>

        </Carousel>
      </div>

      <div className='sponsors'>

      </div>
    </div>
  )
}

export default MainSection
