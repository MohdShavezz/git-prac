import {React,useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {getProductById} from '../src/store/productsSlice'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const fetchProductsById = async (id) => {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data;
};
const Product = () => {
  // const dispatch = useDispatch();
  const [prod,setProd]=useState()
  const { id } = useParams();
  // const product = useSelector((state) => state.products);

  // Dispatch the action and fetch the product by ID
  // useEffect(() => {
  //   dispatch(getProductById(id));
  // }, [dispatch, id]);

  // Select the product from the Redux state
  // console.log(product)
  // const data = product?.items?.products?.find(prod => prod.id == id);

  useEffect(()=>{
    async function fn(){

     const { data, error, isLoading } = useQuery(['product'], fetchProductsById(id));
      setProd(data)
    }
     
    fn()
  },[id])
console.log(prod)
  return (
    <div>
        hiiii
    </div>
  )
}

export default Product
