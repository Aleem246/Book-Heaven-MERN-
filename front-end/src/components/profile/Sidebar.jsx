import { Box, Flex, Image, Text, Link as ChakraLink, Stack, Button, Spacer} from '@chakra-ui/react'
import React from 'react'
import {authActions} from '../../store/auth'
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader/Loader'
import { useEffect } from 'react'

const Sidebar = ({data}) => {

  
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleLogOut= ()=>{
    localStorage.clear();
    dispatch(authActions.logout());
    Navigate('/');
  }
  
  const role = useSelector((state)=>(state.auth.role));
  return (
    <Box p={4} borderRadius={'md'} bg="blackAlpha.400"  h={'80vh'} display={'flex'} flexDirection={'column'}
     justifyContent={'space-between'} alignItems={'center'}>
      <Flex  bg='whte' align={'center'} justify={'center'} gap={4} direction={'column'}>
        {
          (!data)? <Loader/> : (
            <>
            <Image src={data.avatar} alt="avatar" objectFit={'cover'} />
            <Text fontSize={{base: 'lg', md: 'sm', lg: 'md'}} noOfLines={{base:1 , md:2 }} wordBreak='break-all' fontWeight={'bold'} color={'black'}>
              {data.email}</Text>
            </>
          )
        }
      </Flex>

      <Flex gap={8} direction={'column'}  justify={'center'} align={'center'}>
      {
        (role === "user") ? (

          <>
            <ChakraLink as={Link} _hover={{textDecoration:'none' , color:'yellow.500'}} to="/profile"><Text fontSize={'2xl'} fontWeight={'bold'}>Favourites</Text></ChakraLink>
            <ChakraLink as={Link} _hover={{textDecoration:'none' , color:'yellow.500'}} to="/profile/orderHistory"><Text fontSize={'2xl'} fontWeight={'bold'}>My orders</Text></ChakraLink>
            <ChakraLink as={Link} _hover={{textDecoration:'none' , color:'yellow.500'}} to="/profile/settings"><Text fontSize={'2xl'} fontWeight={'bold'}>Settings</Text></ChakraLink>
          </>
        ) : (
          role === "admin" && (
            <>
              <ChakraLink as={Link} _hover={{textDecoration:'none' , color:'yellow.500'}} to="/profile"><Text fontSize={'2xl'} fontWeight={'bold'}>All Orders</Text></ChakraLink>
              <ChakraLink as={Link} _hover={{textDecoration:'none' , color:'yellow.500'}} to="/profile/add-book"><Text fontSize={'2xl'} fontWeight={'bold'}>Add Book</Text></ChakraLink>
              {/* <ChakraLink as={Link} to="/profile/settings"><Text fontSize={'2xl'} fontWeight={'bold'}>Settings</Text></ChakraLink> */}
            </>
          )
        )
      }
      </Flex>
      <Button w='full' colorScheme='red' onClick={handleLogOut}>
        Log Out
      </Button>
       

    </Box>
  )
}

export default Sidebar