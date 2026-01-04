import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  analyzeResume, 
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis
} from '../controllers/analysis.controller.js';
import { authenticateUser, optionalAuth } from '../middleware/auth.middleware.js';

export const analysisRouter = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `resume-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'));
    }
  }
});

// Handle multer errors
const handleUpload = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  upload.single('resume')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size too large. Maximum size is 10MB.',
          error: 'FILE_TOO_LARGE'
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message,
        error: err.code
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
        error: 'UPLOAD_ERROR'
      });
    }
    next();
  });
};

// Routes
// Public route with optional auth (saves to DB if authenticated)
analysisRouter.post('/analyze', handleUpload, optionalAuth, analyzeResume);

// Protected routes
analysisRouter.get('/history', authenticateUser, getAnalysisHistory);
analysisRouter.get('/:id', authenticateUser, getAnalysisById);
analysisRouter.delete('/:id', authenticateUser, deleteAnalysis);