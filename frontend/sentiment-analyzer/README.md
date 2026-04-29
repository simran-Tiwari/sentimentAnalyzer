#  Sentiment Analyzer (AI Powered)

A simple yet powerful **Sentiment Analyzer** that converts user feedback into instant emotional insights using AI 😊😐😞  

This project shows how a basic React form can be enhanced with AI to create a more interactive and intelligent user experience.

---

##  Features

- User input feedback form  
- AI-powered sentiment analysis  
-  Returns **one dominant emotion** (positive / neutral / negative)  
-  Emoji-based visual output  
-  Dynamic UI (color changes based on sentiment)  
-  Fast and responsive  

---

##  How It Works

1. User enters feedback in the React UI  
2. Frontend sends request to backend API  
3. Backend calls AI model via API  
4. AI analyzes text and returns sentiment  
5. UI updates with emoji + color-coded response  

---

##  Tech Stack

- **Frontend:** React (Vite)  
- **Backend:** Node.js, Express  
- **AI Integration:** OpenRouter / OpenAI API  
- **Styling:** CSS  

---

##  Project Structure
sentimentAnalyzer/
│
├── frontend/ 
│ ├── src/
│ └── ...
│
├── server/ 
│ ├── server.js
│ └── ...
│
├── .env
└── README.md


---

##  Installation & Setup

### 1️ Clone the repository
```bash
git clone https://github.com/your-username/sentimentAanalyzer.git

### 2️ Setup Backend
cd backend
npm install

Create a .env file:
OPENROUTER_KEY=your_api_key_here

Run backend:
node server.js

### 3️ Setup Frontend
cd frontend
npm install
npm run dev

## API Endpoint
POST /analyze

Request:

{
  "mesg": "I love this product"
}

Response:

{
  "emotion": "positive",
  "emoji": "😊"
}

## UI Behavior
🟢 Positive → Green tone
🟡 Neutral → Yellow tone
🔴 Negative → Red tone

##  Key Learnings
Integrating AI APIs into real-world applications
Handling async communication between frontend & backend
Designing user-friendly UI for AI responses
Mapping raw model output into meaningful UX


##  Future Improvements
Add confidence score
Real-time sentiment detection
Store feedback in database
Dark/Light mode toggle
Improve mobile responsiveness