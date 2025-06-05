const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const mongoose = require('mongoose');

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a note
router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: 'Note not found' });
    }
    if (req.body.title != null) {
      note.title = req.body.title;
    }
    if (req.body.content != null) {
      note.content = req.body.content;
    }
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    await note.deleteOne(); // Using deleteOne() as requested
    res.json({ message: 'Note deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;