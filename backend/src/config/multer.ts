import multer from 'multer';

const AUDIO_MIME_TYPES = [
  'audio/mpeg', // mp3
  'audio/wav',
  'audio/aac',
  'video/mp4', // mp4 audio
];

const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const storage = multer.memoryStorage();

// Multer file filter
const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  if (file.fieldname === 'audioFile') {
    if (AUDIO_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          'LIMIT_UNEXPECTED_FILE',
          'Invalid audio file type'
        )
      );
    }
  } else if (file.fieldname === 'imageFile') {
    if (IMAGE_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          'LIMIT_UNEXPECTED_FILE',
          'Invalid image file type'
        )
      );
    }
  } else {
    cb(
      new multer.MulterError(
        'LIMIT_UNEXPECTED_FILE',
        `Unexpected field: ${file.fieldname}`
      )
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25 MB
    files: 2, // 2 files per request 
    fields: 6, // 5 fields per request
  },
  fileFilter,
});

export default upload;
