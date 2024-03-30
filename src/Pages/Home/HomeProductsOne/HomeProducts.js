import React, { useEffect, useState } from 'react';
import Product from '../Products/Product';
import { Link } from 'react-router-dom';
import '../HomeProductsOne/HomeProducts.css';

const HomeProducts = (props) => {
  const [prodData] = useState(props.data);
  const [catArray, setCatArray] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabData, setActiveTabData] = useState([]);

  // Populate category array
  useEffect(() => {
    const catArr = prodData.flatMap((item) => item.items.map((item_) => item_.cat_name));
    const uniqueCatArr = Array.from(new Set(catArr)); // Remove duplicates
    setCatArray(uniqueCatArr);
    setActiveTab(uniqueCatArr[0]);
  }, [prodData]);

  // Filter products based on activeTab
  useEffect(() => {
    const filteredData = prodData.flatMap((item) =>
      item.items.flatMap((item_) =>
        item_.cat_name === activeTab ? item_.products.map((product) => ({ ...product, parentCatName: item.cat_name, subCatName: item_.cat_name })) : []
      )
    );
    setActiveTabData(filteredData);
  }, [activeTab, prodData]);

  return (
    <section className="homeProducts">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <h2 className="hd mb-0 mt-0">Popular Products</h2>
          <ul className="list list-inline ms-auto filterTab mb-0">
            {catArray.map((cat, index) => (
              <li key={index} className="list list-inline-item">
                <Link
                  className={`cursor text-capitalize ${activeTabIndex === index ? 'act' : ''}`}
                  onClick={() => {
                    setActiveTab(cat);
                    setActiveTabIndex(index);
                  }}
                >
                  {cat.substr(0, 10) + '...'}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="productRow ">
          {activeTabData.map((item, index) => (
            <div className="item" key={index}>
              <Product tag={item.type} item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;
