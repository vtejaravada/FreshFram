import React, { useEffect, useState } from 'react';
import Product from '../Products/Product';
import { Link } from 'react-router-dom';
import '../HomeProductsOne/HomeProducts.css';

const HomeProducts = (props) => {

  const [prodData, setprodData] = useState(props.data)
  const [catArray, setcatArray] = useState([])
  const [activeTab, setactiveTab] = useState(0);
  const [activeTabIndex, setactiveTabIndex] = useState(0);
  const [activeTabData, setActiveTabData] = useState([]);

  const catArr=[];
//display items names list
  useEffect(()=>{
    prodData.length!==0 &&
    prodData.forEach((item)=>{
      item.items.length!==0 &&
      item.items.forEach((item_)=>{
       
        catArr.push(item_.cat_name);
      })
    })
    const list2 = catArr.filter((item, index)=>catArr.indexOf(item) === index);
    setcatArray(list2)

    setactiveTab(list2[0])
  },[])

//display products

  useEffect(()=>{
    var arr=[];
    setActiveTabData(arr);
    prodData.length !==0 &&
    prodData.forEach((item, index)=>{
      item.items.forEach((item_, index_)=>{
        if(item_.cat_name === activeTab){
          item_.products.length!== 0 &&
          item_.products.forEach((product)=>{
            arr.push({...product, parentCatName: item.cat_name, subCatName: item_.cat_name})
          })
          setActiveTabData(arr)
        }
      })
    })
  }, [activeTab, activeTabData])


  return (
    <>
        <section className="homeProducts">
            <div className="container-fluid">

              <div className="d-flex align-items-center">
                <h2 className="hd mb-0 mt-0">Popular Products</h2>

                <ul className="list list-inline ms-auto filterTab mb-0">

                  {
                    catArray.length !== 0 &&
                    catArray.forEach((cat, index)=>{
                      return(
                        <li key={index} className="list list-inline-item">
                          <Link className={`cursor text-capitalize ${activeTabIndex === index ? 'act' : ''}`} onClick={()=>{
                            setactiveTab(cat)
                            setactiveTabIndex(index)
                          }}>{cat.substr(0,10)+'...'}</Link>
                        </li>
                      )
                    })
                  } 
 
                </ul>
              </div>

              <div className="productRow ">
                  {
                    activeTabData.length !== 0 &&
                    activeTabData.map((item, index)=>{
                        return(
                          <div className="item" key={index}>
                            <Product tag={item.type} item={item} />
                          </div>
                        )
                    })
                  }
              </div>

            </div>
      </section>
    </>
  )
}

export default HomeProducts