import React from 'react'
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import "./test.scss";
import images from '../images/imagesAll';

const BgElement = Element.BgElement;

function Test() {
    return (
        <div className='test'>
            <BannerAnim prefixCls="banner-user" autoPlay>
                <Element
                    prefixCls="banner-user-elem"
                    key="0"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            background: '#364D79',
                        }}/>
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                     
                        <img className='img-slids-long'

                            src={images.e}

                            alt="First slide" />
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                        animation={{ y: 30, opacity: 0, type: 'from', delay: 3 }}
                    >
                        <img className='img-slids-long'

                            src={images.b}

                            alt="Second slide" />
                        <img className='img-slids-long'

                            src={images.b}

                            alt="Third slide" />
                     
                    </TweenOne>
                </Element>
                <Element
                    prefixCls="banner-user-elem"
                    key="1"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            background: '#64CBCC',
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        <img className='img-slids-long'

                            src={images.c}

                            alt="Fourth slide" />
                     
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                        animation={{ y: 30, opacity: 0, type: 'from', delay: 3 }}
                    >
                        <img className='img-slids-long'

                            src={images.b}

                            alt="Fifth slide" />
                     
                    </TweenOne>
                </Element>
            </BannerAnim>
        </div>
    )
}


export default Test