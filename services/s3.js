const AWS = require('aws-sdk');

let s3;

if (
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.AWS_REGION
) {
  // Real AWS config (local/dev)
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  console.log("✅ AWS S3 initialized");
} else {
  // ⚠️ CI mode (no AWS)
  console.log("⚠️ Running in CI mode (AWS disabled)");

  s3 = {
    upload: () => ({
      promise: async () => {
        return {
          Location: "https://dummy-url.com/fake-image.png",
        };
      },
    }),
  };
}

module.exports = s3;