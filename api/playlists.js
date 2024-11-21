const express = require("express");
const prisma = require("../prisma");
const router = express.Router();
module.exports = router;

const { authenticate } = require("./auth");

router.get("/", authenticate, async (req, res, next) => {
  try {
  const playlists = await prisma.playlist.findMany({
    where: { ownerId: req.user.id },
    include: { tracks: true},
  });
  res.json(playlists);
} catch (e) {
  next(e);  
}
});

router.post("/", authenticate, async (req, res, next) => {
  const { name, description, tracks } = req.body;
  try {
    playlist = await prisma.playlist.create({
      data: {
        name: name,
        description: description,
        ownerId: req.user.id,
        tracks: {connect: tracks.map((id) => ({id})) },
      },
    });
    res.status(201).json(playlist);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    playlist = await prisma.playlist.findUniqueOrThrow({
      where: { id: Number(id) },
      include: {tracks: true},
    });
    if (playlist && playlist.ownerId === req.user.id) {
      res.json(playlist);
    } else {
      return next({ status: 404, message: "You are forbidden!!!"})
    }
  } catch (e) {
    next(e);
  }
});