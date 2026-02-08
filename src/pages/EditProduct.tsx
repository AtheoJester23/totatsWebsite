import { useEffect, useState } from 'react'
import ProductsForm from '../components/ProductsForm';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';
import type { detailType } from '../components/Products';
import EditProductsForm from '../components/EditProductsForm';

const EditProduct = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<detailType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data, error } = await supabase.from("products").select().eq("id", id);

        if(error){
          throw new Error(`${error.message}`)
        }

        console.log(data);
        setDetails(data[0])
      } catch (error) {
        console.error((error as Error).message)
      }
    }

    getProduct();
  }, [])

  return (
    <div className="mt-30 p-5 flex flex-col gap-5 overflow-y-hidden">
          <EditProductsForm/>
    </div>
  )
}

export default EditProduct;
