export function generateUsername() {
  return `${Date.now()}`;
}

export function generateTestCustomer() {
  const password = "Test12345!";

  return {
    firstName: "Anna",
    lastName: "Tests",
    street: "44 Oak street",
    city: "Chiang Mai",
    state: "Chiang Mai",
    zipCode: "44000",
    phone: "0444444444",
    ssn: "123456789",
    username: generateUsername(),
    password,
  };
}
