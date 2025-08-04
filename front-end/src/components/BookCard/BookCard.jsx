import { Box, Stack, Text,Link as ChakraLink,
   Image, Heading, Button, Toast, useToast } from '@chakra-ui/react'
import {Link} from "react-router-dom"
import React, { useEffect } from 'react'
import axios from 'axios'
import Loader from '/src/components/Loader/Loader'

const BookCard = ({data , favourite}) => {
const headers = {
  'id' : localStorage.getItem('id'),
  'bookid' : data._id,
  'authentication' : `Bearer ${localStorage.getItem('token')}`
}
useEffect(()=>{
  window.scrollTo(0, 0);
},[])
const Toast = useToast();
  const handleRemove = () => {
      const fetch= async()=>{
          const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/remove-fav` , {}, {headers});
        console.log(response);
          Toast({
            title: response.data.message,
            status: 'success',
            duration: 5000,
            position:'top',
            isClosable: true,
          })
      }
      fetch();
  }
  return (
    
    <Box p={2}  bg="yellow.50" color="gray.800" borderRadius={"lg"} height="100%"
    border="2px solid " borderColor="yellow.600"
    _hover={{ textDecoration: "none", transform: "translateY(-5px) scale(1.02)",
        boxShadow: "0 10px 20px rgba(243, 158, 0, 0.69)",
        borderColor: "yellow.400" }}
      transition="all 0.3s ease" position="relative" overflow="hidden">


        <ChakraLink as={Link} to={`/get-book/${data._id}`} _hover={{ textDecoration: "none", color:"inherit"}} >
    
          <Stack spacing={2}>
            {
              (!data.url)?(
                 
                  <Loader/>
              
              ):(

                <Image src={data.url} alt={data.title} p={2} height="300px" objectFit="cover" borderRadius="md" border={"2px solid yellow.600"}/>
              )
            }
            <Heading as={'h2'} fontSize={{ base: "sm", md: "2xl"}} color="brown.700" noOfLines={1} px={2}>{data.title}</Heading>
            <Text fontSize="xl"  color="brown.600" noOfLines={1} px={2}>{data.author}</Text>
            <Text fontSize="xl"  noOfLines={1} px={2} color={"yellow.600"}>${data.price}</Text>

          </Stack>
          </ChakraLink>
          {
            favourite && (
              <Button mt='2' w='full' colorScheme='red' onClick={handleRemove}>Remove from Favorites</Button>
            )
          }
          
      </Box>

  )
}

export default BookCard