import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
import Dailyimg1 from '../../../assets/images/Banner/DailyImg1.jpg'
import Slider from 'react-slick';
import Product from '../Products/Product';
import '../HomeProductsBan/HomeProductsBan.css'

const HomeProductsBan = (props) => {

    const [prodData] = useState(props.data)

    const [bestSells, setBestSells] = useState([]);

        const settings = {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          fade: false,
          arrows: true,
          autoplay:3000,
          responsive: [
            {
              breakpoint: 1050,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            }
          ]
        };

        const bestSellsArr=[];

        useEffect(()=>{
            prodData.length!==0 &&
            prodData.map((item,index)=>{
                 if(item.cat_name ==="Fashion"){
                     item.items.length!==0 &&
                     item.items.map((item_, index_)=>{
                         item_.products.length!==0 &&
                         item_.products.map((product, index)=>{
                            bestSellsArr.push(product);
                             
                         })
                     })
                 }
            });
            setBestSells(bestSellsArr);
       },[])

        

  return (
    <>
    
        <section className="homeProducts homeProductRow2 pt-0">
            <div className="container-fluid">

                <div className="d-flex align-items-center">
                        <h2 className="hd mb-0 mt-0">Daily Best Sells</h2>
                        {/* <ul className="list list-inline ms-auto filterTab">
                            <li className="list-inline-item">
                                <Link to="/about" className="cursor">Featured</Link>
                            </li>

                            <li className="list-inline-item">
                            <Link to="/about" className="cursor">Popular</Link>
                            </li>

                            <li className="list-inline-item">
                            <Link to="/about" className="cursor">New added</Link>
                            </li>
                        </ul>  */}
                </div>  

                <div className="row productRow">
                    <div className="col-md-3 daily_Img_Sec pr-5">
                        <img src={Dailyimg1} alt="Daily Best Sell" className='w-100' />
                    </div>

                    <div className="col-md-9">
                        <Slider {...settings} className='prodSlider'>
                            {
                                bestSells.length!==0 &&
                                bestSells.map((item, index)=>{
                                    return(
                                        <div className="item" key={index}>
                                           <Product tag={item.type} item={item} />
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default HomeProductsBan