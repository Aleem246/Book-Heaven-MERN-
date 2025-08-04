import { Box, Heading, Text, Flex, Stack, Image } from '@chakra-ui/react';

const AboutUs = () => {
  

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={12}>
      {/* Hero Section */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center" bg='yellow.50'
        px={4}
        mb={16}
      >
        <Box flex={1} mb={{ base: 8, md: 0 }}>
          <Heading as="h1" size="2xl" mb={4}>
            Our Story
          </Heading>
          <Text fontSize="xl"  maxW="2xl">
            Founded in 2023, BookHeaven began as a small passion project and has grown into 
            a community of over 50,000 book lovers worldwide.
          </Text>
        </Box>
        <Box flex={1}>
          <Image 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Bookstore interior"
            borderRadius="lg"
            boxShadow="xl"
          />
        </Box>
      </Flex>

      {/* Mission Section */}
      <Box bg={"yellow.50"} p={8} borderRadius="xl" mb={12}>
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Our Mission
        </Heading>
        <Text fontSize="lg" textAlign="center" maxW="4xl" mx="auto">
          To connect readers with their next favorite book while supporting authors 
          and independent publishers through fair compensation and discovery tools.
        </Text>
      </Box>

      

      {/* Values Section */}
      <Box>
        <Heading as="h2" size="xl" mb={8} textAlign="center">
          Our Values
        </Heading>
        <Stack spacing={6} maxW="3xl" mx="auto">
          {[
            {
              title: "Curated Quality",
              description: "We manually review every title in our collection"
            },
            {
              title: "Reader First",
              description: "No algorithms - just honest recommendations"
            },
            {
              title: "Sustainable Growth",
              description: "We reinvest 20% of profits into literacy programs"
            }
          ].map((value) => (
            <Box key={value.title} bg={"yellow.50"} p={6} borderRadius="lg">
              <Heading as="h3" size="md" mb={2}>
                {value.title}
              </Heading>
              <Text>{value.description}</Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default AboutUs;