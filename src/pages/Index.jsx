import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";

const Index = () => {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState("");
  const toast = useToast();

  const calculateAge = () => {
    if (!birthDate) {
      toast({
        title: "Error",
        description: "Please enter your birthdate.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const currentYear = today.getFullYear();
    const birthYear = birthDateObj.getFullYear();
    const currentMonth = today.getMonth();
    const birthMonth = birthDateObj.getMonth();
    const currentDay = today.getDate();
    const birthDay = birthDateObj.getDate();

    let calculatedAge = currentYear - birthYear;
    let calculatedMonths = currentMonth - birthMonth;
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      calculatedAge--;
      calculatedMonths = 12 + currentMonth - birthMonth;
    }
    if (currentDay < birthDay) {
      calculatedMonths--;
      if (calculatedMonths < 0) {
        calculatedMonths = 11;
      }
    }

    setAge({ years: calculatedAge, months: calculatedMonths });
  };

  return (
    <Container centerContent p={4}>
      <VStack spacing={8} width="100%">
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" width="100%" textAlign="center">
          <Text fontSize="2xl" mb={4}>
            Age Calculator <FaBirthdayCake style={{ display: "inline" }} />
          </Text>
          <FormControl id="birth-date" isRequired>
            <FormLabel>Enter your birthdate:</FormLabel>
            <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </FormControl>
          <Button colorScheme="teal" mt={4} onClick={calculateAge} leftIcon={<FaBirthdayCake />}>
            Calculate Age
          </Button>
          {age.years !== undefined && age.months !== undefined && (
            <Text fontSize="xl" mt={4}>
              Your age is: {age.years} years and {age.months} months
            </Text>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
