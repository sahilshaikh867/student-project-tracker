const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// In-memory store for now (will swap for DB later)
const projects = [];

/**
 * Validation helper
 */
function validateProjectPayload(payload) {
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    return 'Project "name" is required and must be a non-empty string.';
  }
  const allowedStatuses = ['To-Do', 'In-Progress', 'Done'];
  if (payload.status && !allowedStatuses.includes(payload.status)) {
    return `Invalid status. Allowed: ${allowedStatuses.join(', ')}`;
  }
  return null;
}

/**
 * GET /api/projects
 */
router.get('/', (req, res) => {
  res.json(projects);
});

/**
 * POST /api/projects
 * body: { name: string, status?: 'To-Do'|'In-Progress'|'Done' }
 */
router.post('/', (req, res, next) => {
  try {
    const err = validateProjectPayload(req.body);
    if (err) return res.status(400).json({ error: err });

    const project = {
      id: uuidv4(),
      name: req.body.name.trim(),
      status: req.body.status || 'To-Do',
      createdAt: new Date().toISOString()
    };
    projects.push(project);
    res.status(201).json(project);
  } catch (e) { next(e); }
});

/**
 * PUT /api/projects/:id
 * body: { name?: string, status?: 'To-Do'|'In-Progress'|'Done' }
 */
router.put('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    const project = projects.find(p => p.id === id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const err = validateProjectPayload({ name: req.body.name ?? project.name, status: req.body.status ?? project.status });
    if (err) return res.status(400).json({ error: err });

    if (req.body.name) project.name = req.body.name.trim();
    if (req.body.status) project.status = req.body.status;
    project.updatedAt = new Date().toISOString();

    res.json(project);
  } catch (e) { next(e); }
});

/**
 * DELETE /api/projects/:id
 */
router.delete('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Project not found' });

    const deleted = projects.splice(idx, 1)[0];
    res.json({ deleted });
  } catch (e) { next(e); }
});

module.exports = router;
