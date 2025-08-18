import jwt from "jsonwebtoken";

type Payload = {
  id: string;
};

export function generateToken(data: Payload) {
  const token = jwt.sign(data, process.env.JWT_SECRET as string);
  return token;
}

export function verifyToken(token: string) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    return data;
  } catch (error) {
    return null;
  }
}
