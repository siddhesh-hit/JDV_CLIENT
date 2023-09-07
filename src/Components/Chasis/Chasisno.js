import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import Innerbanner from '../Banner/Innerbanner';
import Insurancedetails from '../Common/Insurancedetails';
import microphone from '../../Image/microphone.svg';
import Chasisnoimg from '../../Image/chasis.png'
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
  } from "react-image-magnifiers";
const Chasisno = () => {
    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    return (
        <>
            <Header />
            <Innerbanner />
            <div className='container-fluid text_avbcds'>
                <div className='container pt-3 pb-3'>
                    <div className='row voice_abcd'>
                        <h5>Do you know your chassis number ?</h5>
                        <div style={{ position: 'relative', textAlign: 'center' }} className='col-lg-6 col-sm-12 col-md-12 col-xs-12'>
                            <Form>
                                <Form.Group style={{ alignItems: 'center' }} as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={4}>
                                        Chassis Number
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control style={{ background: 'FFFFFF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }} value={transcript} type="text" />
                                    </Col>
                                </Form.Group>
                            </Form>
                            {/* <button onClick={SpeechRecognition.startListening}><i class="fa fa-microphone" aria-hidden="true"></i>
                            </button> */}
                            <img style={{ cursor: 'pointer', position: 'absolute', right: '5px', top: '12px' }} onClick={SpeechRecognition.startListening} src={microphone} />
                            {/* <button onClick={SpeechRecognition.stopListening}>Stop</button>
                            <button onClick={resetTranscript}>Reset</button> */}
                            <button className='submiit' style={{ marginRight: '20px', marginTop: '20px' }}>
                                <Link >Submit</Link></button>
                            <button onClick={resetTranscript} className='submiit'>Reset</button>
                            <p className='ors'>OR</p>
                            <button className='submiit' style={{ marginBottom: '20px' }}><Link to="/Carbasicinfo">Proceed manually</Link></button>
                        </div>
                        <div className='col-lg-6 col-sm-12 col-md-12 col-xs-12'>
                            {/* <img src={Chasisnoimg} style={{ width: '75%', margin: 'auto', display: 'block' }} /> */}
                            <GlassMagnifier
                                imageSrc={Chasisnoimg}
                                imageAlt="Example"
                                largeImageSrc={Chasisnoimg} // Optional
                                onLargeImageLoad
                                mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK} // Optional
                                dragToMove={true} // Optional
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Insurancedetails />
            <Footer />
        </>
    )
}

export default Chasisno