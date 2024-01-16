/** @type {import('next').NextConfig} */
// it needs for taking images from API
const nextConfig = {
    images:{
        domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
    }
}

module.exports = nextConfig
