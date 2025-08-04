import { Box, Button, Flex, VStack, Image, SimpleGrid, Spacer, Stack, Text, Heading } from '@chakra-ui/react'
import axios from 'axios';
import { DeleteIcon } from '@chakra-ui/icons';
import React from 'react'
import { useEffect } from 'react';
import { useState,  } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const Cart = () => {
  const [carts , setCarts] = useState();
  const [total, setTotal] = useState();
  const navigate = useNavigate();

  const headers = {
    id : localStorage.getItem('id'),
    authentication : `Bearer ${localStorage.getItem('token')}`
  }
  
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  useEffect(()=>{
    
      const fetch = async()=>{
          try{
            const response = await axios.get("http://localhost:8081/api/v1/get-user-cart",{headers});
            // console.log(response.data.data)
            setCarts(response.data.data);
          }catch(err){
            console.log(err);
          }
      }
      fetch();
  },[carts])

  useEffect(() => {
    let total = 0;
    carts?.forEach((cart) => {
      total += cart.price;
    })
    setTotal(total);
    total=0;
    
  }, [carts]);

  const handlePlaceOrder = async()=>{
      try{
        const response = await axios.post(`http://localhost:8081/api/v1/place-order`,{order: carts}, {headers});
        console.log(response.message);
        navigate("/profile/orderHistory")
      }catch(err){
        console.log(err);
      }
  }
    const handleDelete = async(bookId)=>{
        const fetch = async()=>{
          try{
            const response = await axios.put(`http://localhost:8081/api/v1/remove-from-cart/${bookId}` , {} , {headers});
            setCarts(response.data.data);

          }catch(err){
            console.log(err);
          }
        }
        fetch();
    }

  
  return (
    <Box p={8}  minH={'80vh'} bg='yellow.50'>
    <VStack spacing={6}  align={'stretch'}>
      <Heading as="h1"  bg='yellow.50' size="xl" color="blue.800">BookHeaven</Heading>
      <Heading as="h2" size="lg" borderBottom="1px solid" borderColor="gray.200" pb={2}>
        Your Cart
      </Heading>
    
    {
      (!carts)&& <Box>
        <Loader/>
      </Box>
    }

    {carts?.map((cart) => (
      <Box 
        key={cart.title} bg="yellow.100"
        p={6} borderRadius="lg" boxShadow="md"
        _hover={{ boxShadow: 'lg' }}
      >
        <Flex direction={{ base: 'column', md: 'row' }} gap={6} s >
          <Box flexShrink={0} w={{ base: '100%', md: '120px' }} h={{ base: '160px', md: '180px' }}>
            <Image 
              src={cart.url} 
              alt={cart.title} 
              w="100%"
              h="100%"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
          
          <VStack align="flex-start" spacing={3} flex={1}>
            <Heading as="h3" size="md" color="blue.700">
              {cart.title}
            </Heading>
            <Text fontSize="md" color="gray.600" noOfLines={3}>
              {cart.desc}
            </Text>
          </VStack>
          
          <VStack align={{ base: 'flex-start', md: 'center' }}  justify="space-between">
            <Text fontSize="xl" fontWeight="bold" color="blue.800">
              ${cart.price}
            </Text>
            <Button 
              colorScheme="red" 
              variant="outline"
              size="sm"
              leftIcon={<DeleteIcon />}
              onClick={()=>handleDelete(cart._id)}
            >
              Remove
            </Button>
          </VStack>
        </Flex>
      </Box>
    ))
  }
    {

       //total+price */
      carts && carts.length>0 && (
      <Flex align="flex-end" direction='column' mt={8} gap = {6}>
      <VStack>
      <Text fontSize="2xl" fontWeight="bold" color="blue.800">
      Total: ${total.toFixed(2)}
      </Text>
      <Button colorScheme="blue"  px={10} onClick={handlePlaceOrder}>
        Proceed to Checkout
      </Button>
        
      </VStack>
    </Flex>
      )
    
    }
    {
      (carts && carts.length===0 ) && (
        <Flex align="centers" direction='column' mt={8} gap = {6}>
            <VStack>
              <Text fontSize="6xl" fontWeight="bold" color="blue.800">
               Your Cart is empty
              </Text>
            </VStack>
        </Flex>
      )
    
    }
  
    
  </VStack>
</Box>  )
}

export default Cart