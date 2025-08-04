import { Box, Center, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const Favourites = () => {
    const[data, setData] = useState();
    const[loading , setLoading] = useState(true);
    const headers = {
        'authentication': `Bearer ${localStorage.getItem('token')}`,
        'id':localStorage.getItem('id'),

    }
    
    

    useEffect(()=>{
        
        const fetch = async ()=>{
            try{

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/get-fav` , {headers});
                setData(response.data.data);
               
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
            }
        }
        fetch();
    },[data])
  return (
    <Box bg = "yellow.100"  minH='80vh' p={2}>
        {
            (loading)?(
                <Box w='100%' h='60vh'>
                    <Loader/>
                </Box>
                ):
              (data.length===0)?(
                <>
                    <Flex w="100%" h='90vh' justify={'center'} align={'center'}><Text fontSize={'8xl'}>No Favourite Books</Text></Flex>
                </>
            ):(

                <>  
                    <Box >
                        <Heading color="yellow.800" px={{base:2 , md:4}}> Your Favourites</Heading>
                    </Box>
                    <SimpleGrid  p={4} columns={{base:1 , sm:2 , md:3}} spacing={8}>
                            {
                                data.map((item)=>(
                                    <BookCard data={item} favourite={true} key= {item._id}/>
                                ))
                            }
                    </SimpleGrid>
                </>
            )
            
        }

    </Box>
  )
}

export default Favourites