import React from "react";
import Banner1 from "../../Image/Banner/section2.png";
import Banner2 from "../../Image/Banner/section1.png";
import Motor from "../../Image/Insurance/motor.svg";
import Travel from "../../Image/Insurance/travel.svg";
import Yatch from "../../Image/Insurance/boat.svg";
import Home from "../../Image/Insurance/home.svg";
import Individual from "../../Image/Insurance/medical.svg";
import Group from "../../Image/Insurance/groups.svg";
import Terms from "../../Image/Insurance/Frame.svg";
import Other from "../../Image/Insurance/others.svg";
import Mobile from "../../Image/Insurance/mobile.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
const state = {
  autoplay: false,
  loop: false,
  lazyLoad: true,
  responsive: {
    0: {
      items: 1,
    },
    450: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
};

const state1 = {
  lazyLoad: true,
  responsive: {
    0: {
      items: 2,
    },
    450: {
      items: 2,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 8,
    },
  },
};

const state2 = {
  lazyLoad: true,
  responsive: {
    0: {
      items: 1,
    },
    450: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
};
const Banner = () => {
  return (
    <div className="banner_all_one mb-5">
      <OwlCarousel
        className="img_abcds desktop"
        margin={10}
        responsive={state.responsive}
      >
        <div className="item">
          <LazyLoadImage src={Banner1} className="partners_abcd" />
        </div>
        <div className="item">
          <LazyLoadImage src={Banner2} className="partners_abcd" />
        </div>
      </OwlCarousel>
      <OwlCarousel
        style={{ display: "none" }}
        className="img_abcds mobile"
        margin={10}
        responsive={state2.responsive}
      >
        <div className="item">
          <LazyLoadImage src={Mobile} className="partners_abcd" />
        </div>
      </OwlCarousel>
      <div className="container banner_sliders">
        <h3>We Don't Only Compare, We Issue!</h3>
        <OwlCarousel margin={30} responsive={state1.responsive}>
          <div className="item">
            <Link to="/Chasisno">
              <div className="insuranc">
                <img src={Motor} alt="Motor Insurance" />
                <p>Motor</p>
              </div>
            </Link>
          </div>
          <div className="item">
            <Link to="/Traveldetails">
              <div className="insuranc">
                <img src={Travel} alt="Motor Insurance" />
                <p>Travel</p>
              </div>
            </Link>
          </div>
          <div className="item">
            <Link to="/Yatchdetails">
              <div className="insuranc">
                <img src={Yatch} alt="Motor Insurance" />
                <p>Yatch</p>
              </div>
            </Link>
          </div>
          <div className="item">
            <Link to="/Homeinsurance">
              <div className="insuranc">
                <img src={Home} alt="Motor Insurance" />
                <p>Home</p>
              </div>
            </Link>
          </div>
          <div className="item">
            <Link to="/Individualpolicy">
              <div className="insuranc">
                <img src={Individual} alt="Motor Insurance" />
                <p>Individual Medical</p>
              </div>
            </Link>
          </div>
          <div className="item">
            {" "}
            <Link to="/Groupinsurance">
              <div className="insuranc">
                <img src={Group} alt="Motor Insurance" />
                <p>Group Medical</p>
              </div>{" "}
            </Link>
          </div>
          <div className="item">
            <div className="insuranc">
              <img src={Terms} alt="Motor Insurance" />
              <p>Terms Life</p>
            </div>
          </div>
          <div className="item">
            <Link to="/Otherinsurance">
              <div className="insuranc">
                <img src={Other} alt="Motor Insurance" />
                <p>Other Insurance</p>
              </div>
            </Link>
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
};

export default Banner;
