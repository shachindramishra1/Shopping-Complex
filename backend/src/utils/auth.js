import crypto from "crypto";

const HASH_KEY_LENGTH = 64;
const HASH_COST = 14;

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, HASH_KEY_LENGTH, { N: 2 ** HASH_COST }).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedValue) {
  const [salt, storedHash] = storedValue.split(":");
  if (!salt || !storedHash) return false;

  const computedHash = crypto
    .scryptSync(password, salt, HASH_KEY_LENGTH, { N: 2 ** HASH_COST })
    .toString("hex");

  return crypto.timingSafeEqual(Buffer.from(storedHash, "hex"), Buffer.from(computedHash, "hex"));
}

export function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
    createdAt: user.createdAt,
  };
}
