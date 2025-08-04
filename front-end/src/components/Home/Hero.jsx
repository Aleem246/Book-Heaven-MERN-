import { Box, Button, Flex, Heading, Link as ChakraLink, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom";
// import heroImage from "../../assets/hero.jpg"
const Hero = () => {
  return (
    <Flex direction={{ base: "column", md: "row" }} minH={{ base: "auto", md: "90vh" }} w={'100%'} bg="black" align={"center"}>

      <Box px={{ base: 6, md: 10 }}  py={{ base: 10, md: 12 }} 
        w={{ base: "100%", md: "50%" }} bg="black" color="yellow.500" zIndex={1}>

        <Heading as="h1" size={{ base: "xl", lg: "2xl" }} noOfLines={2} fontWeight={'bold'}>
          Discover Your Next Great Read
        </Heading>

        <Text fontSize={{ base: "xl", xl: "2xl" }} px={2} mt={2} color={'yellow.500'} opacity={0.98}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus repellat optio pariatur qui. Re, dicta ad rem ut rerum.
        </Text>
        
        <ChakraLink as={Link} to="/all-books">
          <Button as="button" mt={6} px={8} py={6} size={'lg'} 
           colorScheme={"yellow.500"} borderRadius="full" variant='outline'
            transition="all 0.3s ease"
            _hover={{ transform: "scale(1.05)", bg: "yellow.500", color: "black", borderColor: "yellow.500" }}>
            Discover Books
          </Button>
        </ChakraLink>
      </Box>


      <Box 
        w={{ base: "100%", md: "50%" }} 
        px={{ base: 0, md: 2 }} 
        mt={{ base: 0, md: 0 }}
        position="relative"
        overflow="hidden"
      >
        <Image 
          src="./hero_book.jpg" 
          w="100%"
          maxH={{ base: "300px", md: "100%" }}
          objectFit="cover"
          mx="auto" 
          alt="hero_img" 
          borderRadius={{ base: "none", md: "lg" }}
          
          borderLeft={{ md: "4px solid" }}
          borderColor={{ md: "yellow.500" }} // Yellow accent border
          transform={{ md: "scale(1.02)" }} // Slight zoom
          transition="transform 0.3s ease"
          _hover={{
            transform: "scale(1.03)" 
          }}
        />
      </Box>
    </Flex>
  )
}

export default Hero
