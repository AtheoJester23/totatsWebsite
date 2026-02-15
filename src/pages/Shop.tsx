import { useLocation } from 'react-router-dom'
import Products from '../components/Products'

const Shop = () => {
  const loc = useLocation().pathname.replace(/[/]/g, "");

  return (
    <div className={`${loc == "shop" ? "mt-15 max-sm:p-2 p-5" : "max-sm:mt-30 max-sm:p-5 p-5" }`}>
      <h1 className='font-bold text-center text-5xl text-yellow-500 max-sm:text-xl bg-[rgb(11,11,11)] p-5'>Available in the shop</h1>
      <Products/>
    </div>
  )
}

export default Shop
