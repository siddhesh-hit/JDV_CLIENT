import React, { useEffect } from 'react'
import Bottomfooter from './Bottomfooter';
const Footer = () => {
    const [] = React.useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            <footer className="bg-black section-padding footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6" data-aos="fade-right" data-aos-duration="3000">
                            <div className="footer-box mb-md-80">
                                <div className="footer-heading">
                                    <h4 className="text-custom-white no-margin">Useful Links</h4>
                                </div>
                                <ul className="custom links">
                                    <li>
                                        {" "}
                                        <a
                                            className="text-custom-white"
                                            href="/"
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        {" "}
                                        <a
                                            className="text-custom-white"
                                            href="/"
                                        >
                                            Service
                                        </a>
                                    </li>
                                    <li>
                                        {" "}
                                        <a
                                            className="text-custom-white"
                                            href="/README.md"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        {" "}
                                        <a
                                            className="text-custom-white"
                                            href="/"
                                        >
                                            Team
                                        </a>
                                    </li>
                                    <li>
                                        {" "}
                                        <a
                                            className="text-custom-white"
                                            href="/"
                                        >
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6" data-aos="fade-right" data-aos-duration="3000">
                            <div className="footer-box mb-md-80">
                                <div className="footer-heading">
                                    <h4 className="text-custom-white no-margin">Featured Post</h4>
                                </div>
                                <ul className="custom popular_post">
                                    <li>
                                        <div className="post">
                                            <div className="post-wrapper">
                                                <div className="popular_post_img animate-img">
                                                    <a href="/">
                                                        <img
                                                            src="https://metropolitanhost.com/themes/themeforest/react/loanly/assets/images/blog/blog7.jpg"
                                                            className="img-fluid image-fit"
                                                            alt="Bigger home still the goal?"
                                                        />
                                                    </a>
                                                </div>
                                                <div className="popular_post_title">
                                                    <h6>
                                                        <a
                                                            className="text-custom-white fs-14 fw-400"
                                                            href="/"
                                                        >
                                                            Bigger home still the goal?
                                                        </a>
                                                    </h6>
                                                    <div className="post-date">
                                                        <p className="text-white no-margin">25 January , 2022</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="post">
                                            <div className="post-wrapper">
                                                <div className="popular_post_img animate-img">
                                                    <a href="/">
                                                        <img
                                                            src="https://metropolitanhost.com/themes/themeforest/react/loanly/assets/images/blog/blog7.jpg"
                                                            className="img-fluid image-fit"
                                                            alt="Choosing right education loan"
                                                        />
                                                    </a>
                                                </div>
                                                <div className="popular_post_title">
                                                    <h6>
                                                        <a
                                                            className="text-custom-white fs-14 fw-400"
                                                            href="/"
                                                        >
                                                            Choosing right education loan
                                                        </a>
                                                    </h6>
                                                    <div className="post-date">
                                                        <p className="text-white no-margin">25 January , 2022</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6" data-aos="fade-right" data-aos-duration="3000">
                            <div className="footer-box mb-xs-80">
                                <div className="footer-heading">
                                    <h4 className="text-custom-white no-margin">Twitter Feeds</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6" data-aos="fade-right" data-aos-duration="3000">
                            <div className="footer-box">
                                <div className="footer-heading">
                                    <h4 className="text-custom-white no-margin">News Letter</h4>
                                </div>
                                <div className="newsletter">
                                    <form>
                                        <div className="form-group">
                                            <input style={{height:'45px'}}
                                                type="email"
                                                className="form-control form-control-custom"
                                                placeholder="Email Id"
                                            />
                                        </div>
                                        <button
                                            className="btn-first btn-submit-fill btn-height full-width"
                                            type="submit"
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                                <div className="social-media">
                                    <ul className="custom social-media">
                                        <li>
                                            <a href="https://m.facebook.com/lastminutepolicy/">
                                                <i className="fa fa-facebook-f" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/company/lastminutepolicy/">
                                                <i className="fa fa-linkedin" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-youtube" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-google-plus" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright" data-aos="fade-up" data-aos-duration="3000">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="payment-logo mb-md-20">
                                    {" "}
                                    <span className="text-custom-white fs-14 mr-3">We are accepting</span>
                                    <div className="payemt-icon">
                                        <img
                                            src="https://metropolitanhost.com/themes/themeforest/react/loanly/assets/images/footer-bottom-img.png"
                                            alt="/"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <Bottomfooter/>

        </div>
    )
}

export default Footer
