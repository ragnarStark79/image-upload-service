# Image Upload Service

A Node.js + Express app for uploading images to AWS S3 with a browser UI and CI-friendly fallback behavior.

## Features

- Upload images through a drag-and-drop web interface
- Store files in AWS S3
- Unique file names using UUID
- Image-only validation
- In-memory upload handling with Multer
- CI mode with mocked S3 uploads for automated checks

## Project Structure

- [app.js](app.js) — Express app entry point
- [routes/upload.js](routes/upload.js) — `POST /upload` route
- [services/s3.js](services/s3.js) — AWS S3 client / CI mock
- [public/index.html](public/index.html) — frontend upload UI
- [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — GitHub Actions workflow

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file:

```env
PORT=3001
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=your_bucket_name
```

## Run Locally

Start the server:

```bash
node app.js
```

Open:

```text
http://localhost:3001
```

## API

### `POST /upload`

Uploads a single image file using `multipart/form-data`.

- Field name: `file`
- Accepted types: `image/*`
- Max size: `2 MB`

#### Success response

```json
{
  "url": "https://your-bucket.s3.amazonaws.com/file-name.png",
  "servedBy": "3001"
}
```

## 📈 Load Testing (Fast Forward Way)

This is the fast forward way to test load balancing through terminal. Make sure to replace `file_path` with the actual path of the file you want to upload.

```bash
for i in {1..10}; do curl -X POST http://localhost:8085/upload -F "file=@file_path"; echo ""; done
```

#### Error responses

- `400` — No file uploaded
- `500` — Upload failed or invalid file

## S3 Behavior

The S3 client in [`services/s3.js`](services/s3.js) uses:

- real AWS credentials when environment variables are present
- a mocked upload response in CI when credentials are missing

## CI

GitHub Actions runs the server startup check in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) using dummy AWS values.

## Notes

- No database is used
- No authentication is included
- The app is designed for simple image upload workflows
- Ensure AWS credentials are secure
