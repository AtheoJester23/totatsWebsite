import { sectionHeight } from "../../pages/Home";
import WorkspacePics from "./WorkspacePics";

const Workspace = () => {
    return (  
        <section className='relative w-full'
            style={{
                height: `calc(${sectionHeight}px + 20vh) `
            }} 
        >
            <h1 className="text-white text-4xl font-bold pb-20 text-center">WorkSpace</h1>
            <div className='absolute top-29 z-20 left-0 right-0 h-96 bg-gradient-to-t from-zinc-950/0 to-[rgb(11,11,11)]'/>
            <div
                className='sticky top-0 h-screen w-full'
                style={{
                    backgroundImage: "url(process.gif)",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover'
                }}
            />
            
            <WorkspacePics p1="place1.png" p2="place2.png" p3="place3.png"/>
            <div className='absolute bottom-[-2px] left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-[rgb(11,11,11)]'/>
        </section>
    );
}
 
export default Workspace;