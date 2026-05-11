# 🧠 MindTrack — Student Mental Wellness Tracker

## Problem Description
University students face increasing levels of stress, anxiety, and burnout due to academic pressure. Most students have no simple, private way to monitor their daily mental wellbeing or reflect on emotional patterns over time. Existing platforms are too clinical or require identity disclosure, creating a barrier for students who fear stigma.

## Proposed Solution
MindTrack is a RESTful API backend system that allows students to:
- Anonymously log daily mood, stress levels, and sleep hours
- Set and track personal wellness goals
- Access curated mental health resources

## Features
- ✅ Anonymous mood logging with score, stress level, sleep hours & notes
- ✅ Wellness goal setting and progress tracking
- ✅ Mental health resource management by category
- ✅ Filter resources by category (stress, anxiety, sleep, motivation, general)
- ✅ Filter goals by status (active, completed, abandoned)
- ✅ Full CRUD operations on all collections
- ✅ Input validation and error handling

## Technologies Used
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **API Testing:** Postman
- **Version Control:** GitHub

## Folder Structure
```
mindtrack/
├── server.js
├── .env
├── package.json
├── models/
│   ├── Mood.js
│   ├── Resource.js
│   └── Goal.js
├── routes/
│   ├── moodRoutes.js
│   ├── resourceRoutes.js
│   └── goalRoutes.js
└── controllers/
    ├── moodController.js
    ├── resourceController.js
    └── goalController.js
```

## API Endpoints

### 🌡️ Moods
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/moods` | Log a new mood entry |
| GET | `/api/moods` | Get all mood logs |
| GET | `/api/moods/:id` | Get a single mood log |
| PUT | `/api/moods/:id` | Update a mood log |
| DELETE | `/api/moods/:id` | Delete a mood log |

**POST /api/moods — Example Body:**
```json
{
  "studentId": "student_001",
  "moodScore": 7,
  "stressLevel": 5,
  "sleepHours": 6.5,
  "note": "Feeling okay today, a bit tired after exams"
}
```

### 📚 Resources
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resources` | Add a wellness resource |
| GET | `/api/resources` | Get all resources |
| GET | `/api/resources?category=stress` | Filter by category |
| GET | `/api/resources/:id` | Get a single resource |
| PUT | `/api/resources/:id` | Update a resource |
| DELETE | `/api/resources/:id` | Delete a resource |

**POST /api/resources — Example Body:**
```json
{
  "title": "5 Breathing Techniques to Reduce Exam Stress",
  "description": "Simple breathing exercises proven to reduce anxiety in under 5 minutes.",
  "category": "stress",
  "url": "https://example.com/breathing-techniques",
  "postedBy": "Admin"
}
```

### 🎯 Goals
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/goals` | Create a wellness goal |
| GET | `/api/goals` | Get all goals |
| GET | `/api/goals?status=active` | Filter by status |
| GET | `/api/goals/:id` | Get a single goal |
| PUT | `/api/goals/:id` | Update a goal |
| DELETE | `/api/goals/:id` | Delete a goal |

**POST /api/goals — Example Body:**
```json
{
  "studentId": "student_001",
  "title": "Sleep at least 7 hours every night",
  "description": "Improve sleep quality during exam season",
  "targetDate": "2025-06-30",
  "status": "active",
  "progress": 0
}
```

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or MongoDB Atlas connection string)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/mindtrack.git
cd mindtrack
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```
MONGO_URI=mongodb://localhost:27017/mindtrack
PORT=5000
```

4. **Run the project**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

5. **Test the API**

Open Postman and send a GET request to:
```
http://localhost:5000/
```
You should see: `{ "message": "Welcome to MindTrack API 🧠" }`

## How to Run the Project
1. Make sure MongoDB is running on your machine
2. Run `npm install` to install all packages
3. Run `npm run dev` to start the server
4. Use Postman to test all endpoints
5. Base URL: `http://localhost:5000`
