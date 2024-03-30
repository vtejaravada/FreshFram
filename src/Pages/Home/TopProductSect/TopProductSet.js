import React from 'react'
import TopProject from '../../Home/TopProductSect/TopProducts/TopProject'
import '../TopProductSect/TopProductSet.css'

const TopProductSet = () => {
  return (
    <>
        <section className="topProductSection">
            <div className="container-fluid">
                <div className="row">

                    <div className="topProductSec">
                        <TopProject title="Top Selling"/>
                    </div> 

                    <div className="topProductSec">
                        <TopProject title="Trending Products"/>
                    </div>

                    <div className="topProductSec">
                        <TopProject title="Recently added"/>
                    </div>

                    <div className="topProductSec">
                        <TopProject title="Top Rated"/>
                    </div>
                </div>
            </div>
        </section>
        <br />
    </>
  )
}

export default TopProductSet