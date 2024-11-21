const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async register(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: { username, password: hashedPassword },
        });
        return user;
      },

      async login(username, password) {
        const user = await prisma.user.findUniqueOrThrow({
          where: { username },
        });
        const validCredentials = await bcrypt.compare(password, user.password)
        if (!validCredentials) throw Error("Invalid Credentials");
        return user;
      }
    },
  },
});

module.exports = prisma;