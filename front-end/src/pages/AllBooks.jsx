import { Box, SimpleGrid, Spinner } from '@chakra-ui/react'
import React ,{ useState, useEffect } from 'react'

import BookCard from '../components/BookCard/BookCard';
import axios from 'axios';
import Loader from '../components/Loader/Loader';


const AllBooks = () => {
  const [data, setData] = useState();
  useEffect(()=>{
    window.scrollTo(0, 0);
    const fetch = async()=>{
      try{
        const response =await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/get-all-books`);
        setData(response.data.data);

      }catch(err){
        console.log(err);
      }
    }
    fetch();
  },[])
  return (
   <Box  >
      {
        (!data)?(<Box w='100%' h='80vh'  justify={'center'} align={'center'}>
                 <Loader />
        </Box>): (
          <SimpleGrid bg= "yellow.100" spacing={8} p={4}  columns={{base:1 , sm:2 , md:3 , lg:4  }}>
              {
                data.map((item)=>(
                  <BookCard key={item._id} data = {item}/>
                ))
              }
          </SimpleGrid>
        )
      }

   </Box>
  )
}

export default AllBooks