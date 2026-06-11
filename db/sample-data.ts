import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      email: "akermezo@mes-digital.com",
      password: hashSync("123456", 10),
      role: "admin",
    },
    {
      email: "user@mes-digital.com",
      password: hashSync("123456", 10),
      role: "user",
    },
  ],
};

export default sampleData;
