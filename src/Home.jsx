import {React,useEffect, useState} from 'react'
// import {fetchProducts} from '../src/store/productsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useMutation, useQuery, useQueryClient } from 'react-query'
import Product from './Product';


const fetchProducts = async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data;
};
const portFn=async(data)=>{
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(res=>res.json()).then(res=>res)
}
const Home = () => {

  const { data, error, isLoading } = useQuery(['products'], fetchProducts,{
    staleTime:2000,
    refetchOnWindowFocus:false
  });
  const queryClient=useQueryClient()

  const {mutate} = useMutation({
    mutationFn:portFn,
    onSuccess: (data, variables, context) => {
      console.log('Todo added successfully:', data);
      queryClient.invalidateQueries(['products'])

    },
    onError: (error, variables, context) => {
      console.error('Error adding todo:', error);
    }
  })


  console.log(data)

  const [formData,setFormData]=useState({
    name:'',
    email:'',
    phone:'',
    gender:'',
    hobbies:[],
    dob:''
  })

const onInputChange=(e)=>{
  const {name,value}=e.target
  setFormData({
    ...formData,
    [name]:value
  })
}
const onHobyChange=(e)=>{
  let hobies = [...formData.hobbies]
  if(e.target.checked){
    hobies.push(e.target.value)
  }else{
    hobies=hobies.filter(hob=>hob!=e.target.value)
  }

  // const {name,value}=e.target
  setFormData({
    ...formData,
    hobbies:hobies
  })
}

function hahaha(){
  mutate({
    title: 'foo',
    body: 'bar',
    userId: 1,
  })
}

console.log(formData)

  return (
    <div>
      List of productS:
      {isLoading && 'Loading...'}
      <Link to={'/product/:id'}>goto product</Link>

      <button onClick={hahaha}>mutate</button>

      <h2>form</h2>
      <form>
        <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name='name' id='name' onChange={onInputChange}/>
        </div>
        <div>
        <label htmlFor="email">Email:</label>
        <input type="email" name='email' id='email' onChange={onInputChange}/>
        </div>
        <div>
        <label htmlFor="phone">Phone:</label>
        <input type="number" name='phone' id='phone' onChange={onInputChange}/>
        </div>
        <div>
        <label htmlFor='gender'>Gender:</label><br />
        Male:<input type="radio" name='gender' value={'male'} onChange={onInputChange}/>
        Female:<input type="radio" name='gender' value={'female'}  onChange={onInputChange}/>
        </div>
        <div>
          <label htmlFor="hobies">Hobies:</label>
          <input type="checkbox" name='hoby' value={'AAA'}  onChange={onHobyChange}/>AAA
          <input type="checkbox"  name='hoby' value={'BBB'}  onChange={onHobyChange}/>BBB
          <input type="checkbox"  name='hoby' value={'CCC'}  onChange={onHobyChange}/>CCC
        </div>
        <div>
          <label htmlFor="dob">DOB:</label>
          <input type="date" name='dob' onChange={onInputChange}/>
        </div>
        <button type='submit'>Submit</button>
      </form>

    </div>
  )
}

export default Home
