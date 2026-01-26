import { ImgComponent } from "../../pages/Home"
import { useParallaxRange } from "./useParallaxRange";

const WorkspacePics = ({p1, p2, p3 }: {p1: string, p2: string, p3: string }) => {
    const img1 = useParallaxRange(
        { start: -500, end: 500 }, // desktop
        { start: -150, end: 150 }, // tablet
        { start: -600, end: 700 }    // mobile
    );

    const img2 = useParallaxRange(
        { start: -500, end: 1100 }, // desktop
        { start: -150, end: 150 }, // tablet
        { start: -550, end: 1000 }    // mobile
    );

    const img3 = useParallaxRange(
        { start: -600, end: 1500 }, // desktop
        { start: -150, end: 150 }, // tablet
        { start: -557, end: 1300 }    // mobile
    );



    return (
        <div className='w-full px-4 pt-[200px]'>
            <ImgComponent 
                src={p1}
                alt='Isiah 60:22 Tattoo'
                start={img1.start}
                end={img1.end}
                className='max-sm:w-[60%] w-[30%] z-10 relative max-sm:mx-0'
            />
            <ImgComponent 
                src={p2}
                alt='Isiah 60:22 Tattoo'
                start={img2.start}
                end={img2.end}
                className='max-sm:w-[90%] z-10 w-[50%] z-10 relative mx-auto'
            />
            <ImgComponent 
                src={p3}
                alt='Isiah 60:22 Tattoo'
                start={img3.start}
                end={img3.end}
                className='max-sm:w-[60%] z-5 w-1/3 relative ml-auto'
            />
        </div>
    )
}

export default WorkspacePics;