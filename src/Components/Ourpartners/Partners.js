import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo1 from '../../Image/Partners/1.jpg'
import logo2 from '../../Image/Partners/2.jpg'
import logo3 from '../../Image/Partners/3.jpg'
import logo4 from '../../Image/Partners/4.jpg'
import logo5 from '../../Image/Partners/5.jpg'
import logo6 from '../../Image/Partners/6.jpg'
import logo7 from '../../Image/Partners/7.jpg'
import logo8 from '../../Image/Partners/8.jpg'
import logo10 from '../../Image/Partners/10.jpg'
import logo11 from '../../Image/Partners/11.jpg'
import logo12 from '../../Image/Partners/12.jpg'
import logo13 from '../../Image/Partners/13.jpg'
import logo14 from '../../Image/Partners/14.jpg'
import logo15 from '../../Image/Partners/15.jpg'
import OwlCarousel from 'react-owl-carousel';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
const state = {
    responsive: {
        0: {
            items: 2,
        },
        450: {
            items: 2,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 6,
        },
    },
}
const Partners = () => {

    const [show, setShow] = useState(false);
    const [key, setKey] = useState('home');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <React.Fragment>
            <Container fluid className='partners_all'>
                <Container className='partners'>
                    <div className="section-header">
                        <div className="section-heading">
                            <h3 className="text-custom-black fw-700 our_partners">Our Partners</h3>
                        </div>
                    </div>
                    <OwlCarousel data-aos="fade-right" data-aos-duration="1000" className='mt-5 partners_img' margin={30} autoplay nav={true} dots={false} items={2} touchDrag={true} lazyLoad={true}
                        responsive={state.responsive}>
                        <div className="item">
                            <img src={logo1} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src={logo2} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src={logo3} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src={logo4} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>

                        <div className="item">
                            <img src={logo5} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src={logo6} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src={logo7} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src={logo8} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src={logo10} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src={logo11} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src={logo12} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src={logo13} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>

                        <div className="item">
                            <img src={logo14} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <img src={logo15} className="partners_abcd" alt="review" />
                            <a onClick={handleShow}>
                                <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                </div>
                            </a>
                        </div>
                    </OwlCarousel>
                </Container>
                <Modal size="xl" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Insurance Company's Financial Rating</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="AM Best Rating">
                                <div className="rating-table">
                                    <p className="subHeadTxt">
                                        AM Best is a global rating agency that rank insurance companies based on
                                        their financial strength and stability. Before you buy, check out the
                                        insurance company’s financial rating
                                    </p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Rating Category</th>
                                                <th>Rating Symbol</th>
                                                <th>Definition</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Superior</td>
                                                <td>A+</td>
                                                <td>
                                                    Companies have demonstrated a superior ability to meet financial
                                                    obligations in the eyes of AM Best.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Excellent</td>
                                                <td>A/A-</td>
                                                <td>
                                                    Companies have demonstrated an excellent ability to meet their
                                                    financial obligations in the eyes of AM Best.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Good</td>
                                                <td>B+</td>
                                                <td>
                                                    Companies have demonstrated a good ability to meet their financial
                                                    obligations in the eyes of AM Best.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Fair</td>
                                                <td>B</td>
                                                <td>
                                                    Companies have demonstrated a fair ability to meet their financial
                                                    obligations in the eyes of AM Best. Also, the company's financial
                                                    strength might not be at risk due to specific changes or the current
                                                    state of the economy.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Marginal</td>
                                                <td>C</td>
                                                <td>
                                                    Companies have demonstrated a marginal ability to meet their financial
                                                    obligations in the eyes of AM Best. Also, the company's financial
                                                    strength might be at risk due to specific changes or the current state
                                                    of the economy.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Weak</td>
                                                <td>C+</td>
                                                <td>
                                                    Companies have demonstrated a weak ability to meet their financial
                                                    obligations in the eyes of AM Best. Also, the company's financial
                                                    strength might be at a heightened risk due to specific changes or the
                                                    current state of the economy.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Poor</td>
                                                <td>D</td>
                                                <td>
                                                    Companies have demonstrated a poor ability to meet their financial
                                                    obligations in the eyes of AM Best. Also, the company's financial
                                                    strength might be at extreme risk due to specific changes or the
                                                    current state of the economy.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </Tab>
                            <Tab eventKey="profile" title="S&P Rating">
                                <div className="rating-table">
                                    <p className="subHeadTxt">
                                        AM Best is a global rating agency that rank insurance companies based on
                                        their financial strength and stability. Before you buy, check out the
                                        insurance company’s financial rating
                                    </p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Rating Category</th>
                                                <th>Rating Symbol</th>
                                                <th>Definition</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Superior</td>
                                                <td>A+</td>
                                                <td>
                                                    Companies have demonstrated a superior ability to meet financial
                                                    obligations in the eyes of AM Best.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Excellent</td>
                                                <td>A/A-</td>
                                                <td>
                                                    Companies have demonstrated an excellent ability to meet their
                                                    financial obligations in the eyes of AM Best.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Good</td>
                                                <td>B+</td>
                                                <td>
                                                    Companies have demonstrated a good ability to meet their financial
                                                    obligations in the eyes of AM Best.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Fair</td>
                                                <td>B</td>
                                                <td>
                                                    Companies have demonstrated a fair ability to meet their financial
                                                    obligations in the eyes of AM Best. Also, the company's financial
                                                    strength might not be at risk due to specific changes or the current
                                                    state of the economy.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Marginal</td>
                                                <td>C</td>
                                                <td>
                                                    Companies have demonstrated a marginal ability to meet their financial
                                                    obligations in the eyes of AM Best. Also, the company's financial
                                                    strength might be at risk due to specific changes or the current state
                                                    of the economy.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Weak</td>
                                                <td>C+</td>
                                                <td>
                                                    Companies have demonstrated a weak ability to meet their financial
                                                    obligations in the eyes of AM Best. Also, the company's financial
                                                    strength might be at a heightened risk due to specific changes or the
                                                    current state of the economy.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Poor</td>
                                                <td>D</td>
                                                <td>
                                                    Companies have demonstrated a poor ability to meet their financial
                                                    obligations in the eyes of AM Best. Also, the company's financial
                                                    strength might be at extreme risk due to specific changes or the
                                                    current state of the economy.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
            </Container>
        </React.Fragment>
    )
}

export default Partners