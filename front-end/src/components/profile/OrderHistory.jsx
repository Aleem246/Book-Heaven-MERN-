import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Loader from '../Loader/Loader'
import { Box, Flex, SimpleGrid, Text , Link as ChakraLink} from '@chakra-ui/react'
import {Link } from 'react-router-dom'
const OrderHistory = () => {
  const [order , setOrder] = useState()
  const headers = {
    id : localStorage.getItem("id"),
    authentication : `Bearer ${localStorage.getItem("token")}`
  }

    const getStatusColor = (status) => {
    switch(status) {
      case 'order placed': return 'yellow.500'
      case 'Delivered': return 'green'
      case 'out for delivery': return 'blue'
      case 'Canceled': return 'red'
      default: return 'gray.500'
    }
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
      const fetch = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/get-order-history` , {headers});
        setOrder(response.data.data);
      }
      fetch();
  },[])
  return (
    <>
      {!order && 
      <Flex w = "100%" minH="100%" justify={'center'} align={'center'}>
        <Loader color="black"/>
      </Flex>
      }
      {
        (order && order.length === 0) && 
        <Flex w = "100%" minH="100%" justify={'center'} align={'center'}>
          <Box>No Order Found</Box>
        </Flex>
      }
      {
        (order && order.length > 0) && 
        <Box p={4} maxW="1200px" mx="auto" bg='yellow.50'>
          <Box>
            <Text fontSize={'4xl'} fontWeight={'bold'}p={2} mb={2}>Your Order History</Text>
          </Box>
      <SimpleGrid columns={{ base: 3, md: 6 }} bg='blackAlpha.300' p={4} spacing={4} alignItems="center">
        {/* Header Row */}
        <Text fontWeight="bold" >Books</Text>
        <Text fontWeight="bold" display={{ base: 'none', md: 'block' }}>Description</Text>
        <Text fontWeight="bold" display={{ base: 'none', md: 'block' }}></Text>
        <Text fontWeight="bold" >Price</Text>
        <Text fontWeight="bold" >Status</Text>
        <Text fontWeight="bold" display={{ base: 'none', md: 'block' }}>Mode</Text>
      </SimpleGrid>
        {/* Order Items */}
        {order.map((order, index) => (
          // key={index}
          <ChakraLink as={Link} key={index} to= {`/get-book/${order.book?._id}` } _hover={{ textDecoration: 'none' , color:'none'}} >
            <SimpleGrid  mt={4} p={2} _hover={{textDecoration:'none' ,color:'none'}}columns={{ base: 3, md: 6 }} spacing={4}  alignItems="center"  bg='blackAlpha.400'>
              <Box  >
                <Text fontWeight="medium" >{order.book?.title || "N/A"}</Text>
              </Box>
            
              <Box gridColumn={'span 2'} display={{base: 'none', md: 'block'}}>

                <Text fontSize="sm" color="gray.500" noOfLines={2}>
                  {order.book?.desc?.slice(0, 50) || "No description available"}...
                </Text>
              </Box>
              

              <Box>
                <Text fontWeight="semibold" fontSize="md" color="black">₹{order.book?.price || order.total || "N/A"}</Text>
              </Box>

              <Box >
                <Text color={getStatusColor(order.status)} fontWeight="semibold" fontSize={"md"}>
                  {order.status || "Order placed"}
                </Text>
              </Box>

              <Box   display={{ base: 'none', md: 'block' }}>
                <Text  fontWeight="semibold" fontSize="md" color="black">
                  {order.paymentMethod || "COD"}
                </Text>
              </Box>
            </SimpleGrid>
           </ChakraLink>
        ))}
      
    </Box>
      }
    </>
  )
}

export default OrderHistory