import { Carousel } from 'antd';
import { Fragment, useEffect, useRef } from 'react';
import linebanner from '../../assets/carousel/linebanner.png';
import playbanner2 from '../../assets/carousel/playbanner2.png'
import radial_frame2 from '../../assets/carousel/radial_frame2.png'
import radial_ring1 from '../../assets/carousel/radial_ring1.png'
import radial_ring2 from '../../assets/carousel/radial_ring2.png'
import radial_ring3 from '../../assets/carousel/radial_ring3.png'
import radial_ringcode from '../../assets/carousel/radial_ringcode.png'

import './Carousel.scss'
import { NavLink } from 'react-router-dom';
const carouselItemStyle = {
	display: 'flex',
	alignItems: 'center',
};
const contentStyle ={
	display: 'flex',
}
const contentCarouselStyle = {
	display: 'flex',
	flexDirection: 'column',
	marginLeft: '1rem',
	width: '60%',
	alignItems:	'center',
};
const btnCarousel={
	backgroundColor: "#c1c104",
	color: 'white',

}

function CarouselHome() {
	const carouselRef = useRef();

	const onChange = (currentSlide) => {
		console.log(currentSlide);
	};

	return (
		<Fragment>
			<Carousel
				ref={carouselRef}
				effect={'scrollx'}
				dotPosition='top'
				afterChange={onChange}
				autoplay={false}
				style={{ backgroundColor: '#1b1b1b' }}
			>
				<div className={contentStyle}>
					<div style={{display: 'flex', alignItems: 'center'}}>
					<div style={carouselItemStyle} className="image-container">
						<img src={linebanner} className="linebanner" />
						<img src={radial_frame2} className="carousel-image rotate-left-image " />
						<img src={radial_ring1} className="carousel-image rotate-right-image " />
						<img src={radial_ring2} className="carousel-image rotate-right-image " />
						<img src={radial_ring3} className="carousel-image rotate-right-image " />
						<img src={radial_frame2} className="carousel-image rotate-left-image " />
						<img src={radial_ringcode} className="carousel-image rotate-image" />
						<NavLink className={'center-image'} style={{ transform: 'scale(0.65)' }}>
							<img src={playbanner2} />
						</NavLink>
					</div>
					<div className="contentCarousel" style={contentCarouselStyle}>
						<h3 style={{ fontSize: '60px', color: 'yellow', maxWidth: '60%',    }}>Khởi đầu sự nghiệp của bạn</h3>
						<h4 style={{ fontSize: '30px', color: 'white', maxWidth: '60%' }}> Trở thành lập trình viên chuyên nghiệp tại CyberSoft</h4>
						<div className='mt-3'>
						<button style={btnCarousel}>Xem khoá học</button>
						<button className='btnCarousel1'>Tư vấn học</button>
						</div>
						
					</div>
					</div>
				</div>
			</Carousel>
		</Fragment>
	);
}

export default CarouselHome;