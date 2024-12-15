import jwt from "jsonwebtoken";

process.loadEnvFile();

export const generateJWT = () => {
  const data = {
    name: "Jero",
    credit_card: "1234-1234-1234-1234",
    password: "password",
  };

  const token = jwt.sign(data, process.env.JWT_SECRET || "", {
    expiresIn: "6m",
  });
  return token;
};
