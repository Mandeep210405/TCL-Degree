# TCL-Degree

A comprehensive vaccination management system that helps users track and manage their family's vaccination schedules.

## 🚀 Features

- User authentication and profile management
- Family member management
- Vaccination tracking and scheduling
- Smart vaccine suggestions based on age and medical history
- Interactive dashboard with vaccination status
- Detailed vaccination history and records
- Email notifications for upcoming vaccinations

## 🛠️ Tech Stack

### Frontend
- React.js with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Modern UI/UX design

### Backend
- Node.js
- Express.js
- MySQL Database
- RESTful API architecture

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/mandeep210405/TCL-Degree.git
cd TCL-Degree
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up the database
```bash
# Import the database schema
mysql -u your_username -p < allvax.sql
```

4. Configure environment variables
- Create a `.env` file in the backend directory
- Add necessary environment variables (database credentials, JWT secret, etc.)

5. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev
```

## 📚 API Documentation

The API documentation is available in the `api_documentation.txt` file. The base URL for the API is `http://localhost:3000`.

## 👤 Author

**Mandeep**
- GitHub: [@mandeep210405](https://github.com/mandeep210405)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their invaluable tools and libraries
