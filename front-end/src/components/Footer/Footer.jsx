import { Box, Heading, Flex, Stack, Text, Link, Divider } from "@chakra-ui/react";
import React from "react";
import { FaBookOpen, FaHeart, FaRegEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <Box 
      as="footer" 
      py={8} 
      px={{ base: 4, md: 10 }}
      bg="blackAlpha.900" 
      w="100%" 
      color="yellow.400"
      borderTop="2px solid"
      borderColor="yellow.600"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="1200px"
        mx="auto"
        justify="space-between"
        align="flex-start"
        spacing={8}
        
      >
        {/* Brand Info */}
        <Stack spacing={4} mb={{ base: 6, md: 0 }}>
          <Heading as="h3" size="lg" color="yellow.500">
            <Flex align="center">
              <FaBookOpen style={{ marginRight: "8px" }} />
              Book Heaven
            </Flex>
          </Heading>
          <Text fontSize="md">
            Your ultimate destination for rare finds and bestsellers
          </Text>
          <Text fontSize="sm" color="yellow.300">
            Established in 2020
          </Text>
        </Stack>

        {/* Quick Links */}
        <Stack spacing={4}>
          <Heading as="h4" size="md">
            Quick Links
          </Heading>
          
          <Link href="/aboutus" color="yellow.300" _hover={{ color: "yellow.500" }}>
            About Us
          </Link>

          <Link href="/" color="yellow.300" _hover={{ color: "yellow.500" }}>
            Contact
          </Link>

          <Link href="/" color="yellow.300" _hover={{ color: "yellow.500" }}>
            Privacy Policy
          </Link>

          <Link href="/" color="yellow.300" _hover={{ color: "yellow.500" }}>
            Terms of Service
          </Link>
        </Stack>

        {/* Contact Info */}
        <Stack spacing={4}>
          <Heading as="h4" size="md">
            Contact Us
          </Heading>
          <Flex align="center">
            <FaRegEnvelope style={{ marginRight: "8px" }} />
            <Text>support@bookheaven.com</Text>
          </Flex>
          <Flex align="center">
            <FaMapMarkerAlt style={{ marginRight: "8px" }} />
            <Text>123 Library Lane, Bookville</Text>
          </Flex>
        </Stack>
      </Flex>

      <Divider my={6} borderColor="yellow.700" />
      

      {/* Copyright */}
      <Flex 
        direction={{ base: "column", md: "row" }}
        justify="space-between" 
        align="center"
        maxW="1200px"
        mx="auto"
        pt={4}
      >
        <Text fontSize="sm" color="yellow.300">
          &copy; 2025 Book Heaven. All rights reserved.
        </Text>
        <Flex align="center" mt={{ base: 2, md: 0 }}>
          <Text mr={2}>Made with</Text>
          <FaHeart color="#E53E3E" />
          <Text ml={2}>for book lovers</Text>
        </Flex>
        <Text fontSize="sm" color="yellow.300">
          ISBN: 978-3-16-148410-0
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;