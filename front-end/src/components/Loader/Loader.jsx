import React from 'react'
import { Flex, Spinner, Text } from '@chakra-ui/react'
const Loader = () => {
  return (
    <Flex gap={2} w='100%' h='100%' justify={'center'}  align={'center'}>
        <Spinner
        thickness='4px'
        speed='0.5s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
      <Text fontSize={'3xl'} >Loading...</Text>
    </Flex>
  )
}

export default Loader