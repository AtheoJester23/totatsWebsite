import { ImgComponent } from "../../pages/Home";
import { useParallaxRange } from "./useParallaxRange";

const ParallaxImages = ({p1, p2, p3, p4}: {p1: string, p2: string, p3: string, p4: string}) => {
    const img1 = useParallaxRange(
        { start: -200, end: 200 }, // desktop
        { start: -150, end: 150 }, // tablet
        { start: -80, end: 80 }    // mobile
    );

    const img2 = useParallaxRange(
        { start: -200, end: 1000 }, // desktop
        { start: -150, end: 150 }, // tablet
        { start: -50, end: 300 }    // mobile
    );

    const img3 = useParallaxRange(
        { start: -500, end: 1000 }, // desktop
        { start: -150, end: 150 }, // tablet
        { start: -150, end: 300 }    // mobile
    );

    const img4 = useParallaxRange(
        { start: -600, end: 1200 }, // desktop
        { start: -150, end: 150 }, // tablet
        { start: -155, end: 450 }    // mobile
    );


    return (
        <div className='w-full px-4 pt-[200px]'>
            <ImgComponent 
                src={p1}
                alt='Isiah 60:22 Tattoo'
                start={img1.start}
                end={img1.end}
                className='max-sm:w-[50%] w-[30%] z-10 relative max-sm:mx-0'
            />
            <ImgComponent 
                src={p2}
                alt='Isiah 60:22 Tattoo'
                start={img2.start}
                end={img2.end}
                className='max-sm:w-[80%] z-10 w-[50%] z-10 relative mx-auto'
            />
            <ImgComponent 
                src={p3}
                alt='Isiah 60:22 Tattoo'
                start={img3.start}
                end={img3.end}
                className='max-sm:w-[50%] z-5 w-1/3 relative ml-auto'
            />
            <ImgComponent 
                src={p4}
                alt='Isiah 60:22 Tattoo'
                start={img4.start}
                end={img4.end}
                className='max-sm:w-[50%] w-1/3 z-10 relative mx-auto'
            />
        </div>
    )
}

export default ParallaxImages;