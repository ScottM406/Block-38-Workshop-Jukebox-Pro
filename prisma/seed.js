const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async (numTracks = 20) => {
  const tracks = Array.from({ length: numTracks }, () => ({
    name: faker.music.songName() + " by " + faker.music.artist(),
  }));
  await prisma.track.createMany({ data: tracks });
  await prisma.user.create({ 
    data: { 
      id: 99, 
      username: "test", 
      password: "test" } });
  await prisma.playlist.create({ 
    data: {
      name: "No one owns this", 
      description: "test purposes only",
      ownerId: 99,
      tracks: { connect: { id: 1 } },
    }
  });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });