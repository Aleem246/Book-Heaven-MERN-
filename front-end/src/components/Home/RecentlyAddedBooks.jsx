
import React, { useEffect, useState } from 'react'
import axios from "axios"
import BookCard from '../BookCard/BookCard.jsx'
import { Box, Spinner, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import Loader from '../Loader/Loader.jsx';
const RecentlyAddedBooks = () => {
  const [data , setData] = useState();
  const [loading , setLoading] = useState(true);
  useEffect(()=>{
    const fetch = async()=>{
     try{
        const response = await axios.get("http://localhost:8081/api/v1/get-recent-books");
        setData(response.data.data);
      
      
     }catch(err){
        console.log(err);
     }finally{
      setLoading(false);
     } 
    }
     fetch();

  },[]);


  return (
    <Box  bg="yellow.100" w="100%">
      <Heading as="h1"   py={2} color={"yellow.500"} bg="black" 
      fontSize= {{base:"2xl" , md:"3xl" ,lg:"4xl"}} border='2px solid' borderTopColor={'yellow.500'} fontWeight={'semibold'}  textAlign="center"
        position="relative">
        Recently Added Books
      </Heading>
      {
        (loading)?(<Box w='100%' h='80vh'>
              <Loader/>
          </Box>):
        (
          <SimpleGrid  width="100%" maxWidth="1350px" mx='auto'
           columns={{base: 1 , md:2, lg:4 }}  spacing={{base : 6 , md : 8}} p={4}>
            {

              data.map((item)=>(
                <BookCard key = {item._id}  data={item}></BookCard>
                
              ))
            }
            
          </SimpleGrid>

        )
      }
    </Box>
  )
}

export default RecentlyAddedBooks