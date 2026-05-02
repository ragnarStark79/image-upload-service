# Image Upload Service with Load Balancer

## 🚀 Features

* Upload images using API
* Store files in AWS S3
* Load balancing using NGINX
* Multiple backend instances
* Unique file naming with UUID

---

## 🧱 Architecture

Client → NGINX (port 85) → Node Servers (3001, 3002) → AWS S3

---

## ⚙️ Setup

### 1. Install dependencies

npm install

### 2. Add environment variables (.env)

PORT=3001
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=ap-south-1
S3_BUCKET_NAME=your_bucket

---

### 3. Run multiple instances

PORT=3001 node app.js
PORT=3002 node app.js

---

### 4. Start NGINX

brew services start nginx

---

## 📦 API

### POST /upload

* URL: [http://localhost:85/upload](http://localhost:85/upload)
* Body: form-data → file

### Response

{
"url": "S3_FILE_URL",
"servedBy": "3001"
}

---

## 🔁 Load Balancing

NGINX distributes requests using round-robin across:

* localhost:3001
* localhost:3002

---

## 📈 Load Testing (Fast Forward Way)

This is the fast forward way to test load balancing through terminal. Make sure to replace `file_path` with the actual path of the file you want to upload.

```bash
for i in {1..10}; do curl -X POST http://localhost:8085/upload -F "file=@file_path"; echo ""; done
```

---

## ⚙️ CI (GitHub Actions)

* Runs on push & pull request
* Installs dependencies
* Starts server
* Fails if server does not run

---

## 📌 Notes

* No database used
* No authentication
* Focus on infrastructure and system design
* Ensure AWS credentials are secure
