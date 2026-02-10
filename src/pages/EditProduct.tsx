import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';
import type { detailType } from '../components/Products';
import EditProductsForm from '../components/EditProductsForm';

const EditProduct = () => {
  const { id } = useParams();
  const [ _, setDetails] = useState<detailType | null>(null)

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
