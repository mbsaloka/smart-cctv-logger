# Smart CCTV Logger
This repository serves as the front-end application for the Smart CCTV Logger, a website for CCTV logging and real-time monitoring. This front-end interacts seamlessly with the following repositories to deliver a fully functional system:

1. [CCTV Logger Backend](https://github.com/MrWhok/CCTV-Logger)
2. [CCTV Detection](https://github.com/MrWhok/CCTV-Logger)

The application is temporarily deployed and accessible at [smart-cctv-logger.vercel.app](https://smart-cctv-logger.vercel.app/)

## Tech Stack
### Front-End
- ReactJS (with Vite)
- Tailwind CSS
- Shadcn UI
- gRPC-Web
- Deployed using Vercel

### Back-End
- ExpressJS
- Deployed using Railway

### Database
- MongoDB
- Hosted on MongoDB Atlas

### Detection
- Python
- OpenCV
- YOLOv8
- RTSP (Real-Time Streaming Protocol)
- gRPC
- Ngrok (for tunneling)

## Prerequisites
Make sure you have the following installed on your system:
- Node.js
- Python
- MongoDB
- OpenCV
- Ngrok
- Git

## How To Run
### Clone the Repositories
```
# Front-End
git clone https://github.com/mbsaloka/smart-cctv-logger.git

# Back-End
git clone https://github.com/MrWhok/CCTV-Logger

# Detection
git clone https://github.com/mbsaloka/cctv-detection
```
### Front-End Set Up
1. Navigate to the FE directory
2. Install dependencies `npm install`
3. Configure `.env` and envoy file
4. Run envoy file `envoy -c envoy.yaml`
5. Start the development server `npm run dev`
6. Open front-end aat `http://localhost:5173`

### Back-End Set Up
1. Navigate to the BE directory
2. Install dependencies `npm install`
3. Configure `.env` file
4. Start MongoDB `systemctl start mongod`
5. Start the server `node src/server.js`

### Detection Set Up
1. Navigate to the Detection directory and then `src/` directory
2. Configure camera index or RTSP url
3. Run server `python3 detection_server.py`
