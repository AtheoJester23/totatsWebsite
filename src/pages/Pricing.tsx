const Pricing = () => {
    return (  
        <div className="flex justify-center items-center mt-40 flex-col gap-10">
            {/* Minimum */}
            <div className="flex max-sm:m-5 p-5 flex-col text-white gap-5">
                <h1 className="max-sm:text-3xl text-5xl font-bold text-center">Minimum</h1>
                <p className="text-center italic font-bold">Size: 3x3 inches</p>
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col border p-5 rounded gap-3 text-center">
                        <h1 className="font-bold">Black and Gray Tattoo</h1>
                        <p>Price: &#8369;700</p>
                    </div>
                    <div className="flex flex-col border p-5 rounded gap-3 text-center">
                        <h1 className="font-bold">Colored Tattoo</h1>
                        <p>Price: &#8369;1,000</p>
                    </div>
                </div>
            </div>

            <hr className="border border-[rgb(7,7,7)] w-[90%]"/>

            {/* Back Piece */}
            <div className="flex max-sm:m-5 p-5 flex-col text-white gap-5">
                <h1 className="max-sm:text-3xl text-5xl font-bold text-center">Back Piece</h1>
                <p className="text-center italic font-bold">Description: Buong Likod</p>
                
                <p className="text-center">Price: &#8369;10,000</p>
            </div>

            <hr className="border border-[rgb(7,7,7)] w-[90%]"/>

            <div className="flex max-sm:m-5 p-5 flex-col text-white gap-5">
                <h1 className="max-sm:text-3xl text-5xl font-bold text-center">Outer/Inner Arm Sleeve</h1>
                <p className="text-center italic"><strong>Description:</strong> Tattoo sleeve sa harap o likod ng buong braso, blanko sa kabilang side ng buong braso</p>
                
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col border p-5 rounded">
                        <h1 className="font-bold">Black and Gray Tattoo</h1>
                        <p>Price: &#8369;10,000</p>
                    </div>
                    <div className="flex flex-col border p-5 rounded">
                        <h1 className="font-bold">Colored Tattoo</h1>
                        <p>Price: &#8369;15,000</p>
                    </div>
                </div>
            </div>

            <hr className="border border-[rgb(7,7,7)] w-[90%]"/>

            <div className="flex max-sm:mb-15 p-5 flex-col text-white gap-5 mb-15">
                <h1 className="max-sm:text-3xl text-5xl font-bold text-center">Full Sleeve</h1>
                <p className="text-center italic"><strong>Description:</strong> Tattoo sleeve sa harap o likod ng buong braso, blanko sa kabilang side ng buong braso</p>
                
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col border p-5 rounded">
                        <h1 className="font-bold">Black and Gray Tattoo</h1>
                        <p>Price: &#8369;20,000</p>
                    </div>
                    <div className="flex flex-col border p-5 rounded">
                        <h1 className="font-bold">Colored Tattoo</h1>
                        <p>Price: &#8369;30,000</p>
                    </div>
                </div>
            </div>

            
        </div>
    );
}
 
export default Pricing;
