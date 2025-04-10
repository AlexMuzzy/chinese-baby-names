import { useState } from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Container,
  Badge,
  SimpleGrid,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Card, CardBody } from '@chakra-ui/card'
import { Select } from '@chakra-ui/select'
import { useToast } from '@chakra-ui/toast'
import { nameData, NameInfo } from './nameData'
function App() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [lastName, setLastName] = useState('')
  const [generatedNames, setGeneratedNames] = useState<NameInfo[]>([])
  const toast = useToast()

  // Responsive values
  const headingSize = useBreakpointValue({ base: 'lg', md: 'xl' })
  const subheadingSize = useBreakpointValue({ base: 'md', md: 'lg' })
  const containerPadding = useBreakpointValue({ base: 4, md: 12 })

  const generateNames = () => {
    if (!lastName) {
      toast({
        title: '请输入姓氏',
        description: 'Please enter your family name to continue',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // In a real app, we would use an API to generate names
    // For now, we'll randomly select from our sample data
    const names = nameData[gender]
    const shuffled = [...names].sort(() => 0.5 - Math.random())
    setGeneratedNames(shuffled.slice(0, 3))
  }

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100vw"
      maxW="100%"
      overflowX="hidden"
    >
      <Container
        maxW={{ base: "100%", md: "container.md", lg: "container.lg" }}
        px={{ base: 4, md: 6 }}
        py={containerPadding}
      >
        <VStack gap={{ base: 4, md: 8 }} w="full">
          <Heading as="h1" size={headingSize} textAlign="center" w="full">
            英文名字生成器
            <Text fontSize={subheadingSize} color="gray.600">
              English Name Generator for Chinese Families
            </Text>
          </Heading>

          <Card w="full" variant="elevated">
            <CardBody p={{ base: 4, md: 6 }}>
              <VStack gap={{ base: 3, md: 4 }} w="full">
                <Input
                  placeholder="Enter your family name (姓氏)"
                  value={lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                  size={{ base: 'md', md: 'lg' }}
                />

                <Select
                  value={gender}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGender(e.target.value as 'male' | 'female')}
                  size={{ base: 'md', md: 'lg' }}
                >
                  <option value="male">Male (男)</option>
                  <option value="female">Female (女)</option>
                </Select>

                <Button
                  colorScheme="blue"
                  size={{ base: 'md', md: 'lg' }}
                  onClick={generateNames}
                  w="full"
                >
                  Generate Names 生成名字
                </Button>
              </VStack>
            </CardBody>
          </Card>

          {generatedNames.length > 0 && (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={{ base: 3, md: 4 }} w="full">
              {generatedNames.map((nameInfo, index) => (
                <Card key={index} w="full">
                  <CardBody p={{ base: 3, md: 4 }}>
                    <VStack align="start" gap={2}>
                      <Heading size={{ base: 'sm', md: 'md' }}>{nameInfo.name}</Heading>
                      <Badge colorScheme="blue" fontSize={{ base: 'xs', md: 'sm' }}>{nameInfo.meaning}</Badge>
                      <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                        {nameInfo.cultural_notes}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default App
