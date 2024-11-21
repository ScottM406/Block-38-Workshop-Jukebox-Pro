const express = require("express");
const prisma = require("../prisma");
const router = express.Router();
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
  const tracks = await prisma.track.findMany();
  res.json(tracks);
  } catch (e) {
    next (e);
  }
  })

  router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    const isInUserPlaylist = req.user
    ? { where: { ownerId: req.user.id } }
    : false;
    try {
      const track = await prisma.track.findUniqueOrThrow({
        where: {id: Number(id)},
        include: { playlists: isInUserPlaylist },
      });
      res.json(track);
    } catch (e) {
      next(e);
    }
  })
