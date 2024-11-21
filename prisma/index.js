const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();$extends({
  model: {
    customer: {
      async register(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.customer.create({
          data: { username, password: hashedPassword },
        });
        return customer;
      },

      async login(username, password) {
        const user = await prisma.customer.findUniqueOrThrow({
          where: { username },
        });
        const validCredentials = await bcrypt.compare(password, user.password)
        if (!validCredentials) throw Error("Invalid Credentials");
        return customer;
      }
    },
  },
});

module.exports = prisma;