import React, { useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Otherbanner from '../Banner/Otherbanner'
import Insurancedetails from '../Common/Insurancedetails'
import { Link } from 'react-router-dom'
import { Form, FormControl, InputGroup } from 'react-bootstrap'

const Otherinsurancesubmit = () => {
    const [startDate, setStartDate] = useState();
    return (
        <div>
            <Header />
            <Otherbanner />
            <div className='container-fluid car_info pt-4 pb-4 thankyou'>
                <div
                    className="row"
                    style={{ justifyContent: "center", marginTop: 65, marginBottom: 65 }}
                >
                    <div className="col-lg-5">
                        <form action="#" className="card-content">
                            <div className="container">
                                <img style={{width:'450px'}} src="https://quickcash.ae/static/media/thankyou.cda32f5eb9c98333a6a3035a638a7fea.svg" />
                                <p>New submission added to Other Insurance Types</p>
                                <p />
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <Insurancedetails />
            <Footer />
        </div>
    )
}

export default Otherinsurancesubmit