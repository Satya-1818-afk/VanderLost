# 🌍 VanderLost – Discover Places, Share Experiences

**VanderLost** is a full-stack web application where users can explore, create, and share listings of interesting places. Users can discover destinations, upload images, leave reviews, and visualize locations through an interactive map.

Built using the **MERN ecosystem (MongoDB, Express.js, Node.js)** with EJS as the templating engine, VanderLost focuses on providing a simple and interactive platform for discovering places and sharing experiences.

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration and login.
- Secure authentication using Passport.js.
- Session-based user authentication.
- Authorization to ensure users can manage only their own listings.
- Protected routes and middleware.

### 🏡 Listing Management

- Create new place listings.
- View all available listings.
- View detailed information about individual listings.
- Edit and delete your own listings.
- Store listing details such as title, description, price, location, and country.

### ⭐ Reviews & Ratings

- Users can leave reviews on listings.
- Review management and deletion.
- Server-side and client-side validation.
- Reviews associated with individual users and listings.

### 🗺️ Interactive Maps

- Integrated Mapbox for interactive maps.
- Display listing locations using map markers.
- GeoJSON-based location data.
- Visualize geographical locations of listings.

### 🖼️ Image Uploads

- Upload images for individual listings.
- Cloud-based image storage.
- Image handling and storage configuration.
- Display listing images dynamically.

### ⚡ Additional Functionality

- Flash messages for success and error notifications.
- Form validation using Joi.
- Responsive user interface.
- Dynamic server-side rendering using EJS.
- MongoDB database integration.

---

## 🛠️ Tech Stack

| Category           | Technologies                          |
| ------------------ | ------------------------------------- |
| Backend            | Node.js, Express.js                   |
| Frontend           | EJS, HTML, CSS, JavaScript, Bootstrap |
| Database           | MongoDB, Mongoose                     |
| Authentication     | Passport.js, Passport-Local-Mongoose  |
| Maps               | Mapbox                                |
| Image Uploads      | Cloudinary, Multer                    |
| Validation         | Joi                                   |
| Session Management | Express-Session, Connect-Mongo        |
| Templating         | EJS, EJS-Mate                         |
| Version Control    | Git, GitHub                           |

---

## 📂 Project Structure

```text
VanderLost/
│
├── controllers/       # Application business logic
│
├── init/              # Database initialization and sample data
│
├── models/             # Mongoose database models
│
├── public/             # Static assets (CSS, JS, images)
│
├── routes/             # Express application routes
│
├── uploads/            # Uploaded image files
│
├── utils/              # Utility functions and error handling
│
├── views/              # EJS templates
│
├── app.js              # Main application entry point
├── cloudConfig.js      # Cloud image storage configuration
├── middleware.js       # Authentication and authorization
├── schema.js           # Joi validation schemas
│
├── package.json
├── package-lock.json
└── .gitignore
```

---

## ⚙️ Installation & Setup

Follow these steps to run VanderLost locally.

### 1. Clone the repository

```bash
git clone https://github.com/Satya-1818-afk/VanderLost.git
```

### 2. Navigate to the project directory

```bash
cd VanderLost
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and configure your credentials.

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

MAP_TOKEN=your_mapbox_access_token

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Make sure the environment variable names match those used in your application configuration.

### 5. Start the application

```bash
node app.js
```

Open your browser and visit:

```text
http://localhost:8080
```

---

## 🧠 What I Learned

Building VanderLost helped me gain practical experience in:

- Developing full-stack web applications using Node.js and Express.
- Designing database schemas and relationships using MongoDB and Mongoose.
- Implementing authentication and authorization using Passport.js.
- Building RESTful routes and organizing application logic using MVC architecture.
- Integrating third-party APIs such as Mapbox.
- Implementing image uploads and cloud storage.
- Handling server-side and client-side validation.
- Managing sessions and user-specific resources.
- Debugging, testing, and deploying web applications.

---

## 🚀 Future Improvements

- [ ] Add advanced search and filtering.
- [ ] Implement sorting by price and ratings.
- [ ] Improve user profile management.
- [ ] Add wishlist and favorite listings.
- [ ] Enhance the UI and user experience.
- [ ] Add pagination for listings.
- [ ] Improve application performance and scalability.

---

## 👨‍💻 Developer

**Satyakam Mohanty**

Computer Science & Engineering Student | Full-Stack Developer

- GitHub: [@Satya-1818-afk](https://github.com/Satya-1818-afk)

---

⭐ If you find this project interesting, consider giving it a star!

**VanderLost – Explore More. Discover More.**
