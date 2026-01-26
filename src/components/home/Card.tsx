const Card = ({src, text}: {src: string, text: string}) => {
    return (  
        <div className='rounded-xl p-5 max-sm:h-[200px] h-[350px] max-sm:w-[200px] w-[350px] flex justify-center items-center'
            style={{
                backgroundImage: `url(${src})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: 'cover'
            }}
        >
            <h1 className='max-sm:text-3xl text-5xl font-bold text-[rgb(18,18,18)]'>{text}</h1>
        </div>
    );
}
 
export default Card;