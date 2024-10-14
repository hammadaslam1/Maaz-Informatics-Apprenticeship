import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Using globalThis to maintain the Prisma client instance
globalThis.prismaGlobal = globalThis.prismaGlobal || prismaClientSingleton();

const prisma = globalThis.prismaGlobal;

export default prisma;

// Prevent creating a new Prisma client instance in development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
