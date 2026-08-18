# 🔐 Authentication & Authorization with JWT in Express.js

This guide explains how to implement a complete authentication and authorization system in an Express.js application using **MongoDB**, **Mongoose**, **JWT**, and **bcryptjs**.

---

# Create the User Schema

The `User` model defines how users are stored in MongoDB.

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },

    role: {
      type: String,
      enum: {
        values: ["student", "admin"],
        message: "Role must be student, or admin",
      },
      default: "student",
    },

    phone: {
      type: String,
      trim: true,
      match: [/^\+?[0-9]{10,15}$/, "Please provide a valid phone number"],
    },

    imageUrl: {
      type: String,
      trim: true,
      default: "default-user.webp",
    },

    myCourses: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
```

## Why these fields?

- `email` is unique to prevent duplicate accounts.
- `password` uses `select: false` so it is hidden by default.
- `role` determines what actions the user can perform.
- `myCourses` stores references to enrolled courses.
- `timestamps` automatically adds `createdAt` and `updatedAt`.

# Default User Image

Store a default image inside:

```
uploads/
└── users/
    └── default-user.webp
```

If the user doesn't upload a profile picture, this image will be used automatically.

---

# Hash Passwords with bcrypt

Install:

```bash
npm install bcryptjs
```

Before saving a user, hash the password.

```js
const bcrypt = require("bcryptjs");

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
```

## Why?

Never store plain-text passwords in the database.

Example:

```
12345678
```

becomes something like:

```
$2b$10$P5Q...
```

During login, `bcrypt.compare()` checks whether the entered password matches the hashed one.

---

# Generate JWT Tokens

Install:

```bash
npm install jsonwebtoken
```

Generate a secure secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`.env`

```env
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

Create:

```
utils/get-jwt.js
```

```js
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );
};

module.exports = generateToken;
```

The token stores only minimal information:

- User ID
- User Role

---

# Auth Controllers

`controllers/auth-controllers.js`

## User Registration (Sign Up)

```js
const generateToken = require("../utils/get-jwt");

const signup = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      role: "student",
      imageUrl: req.file?.filename,
    });

    const token = generateToken(user);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
      data: { user },
    });
  } catch (error) {
    if (req.file) {
      deleteUploadedFile("users", req.file.filename);
    }
    res.status(400).json({
      status: "error",
      message: `Error in signup: ${error.message}`,
    });
  }
};
```

### Flow

1. Receive request data.
2. Save the user.
3. Hash the password automatically.
4. Generate a JWT.
5. Return the token to the client.

---

## User Login (Sign In)

```js
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and Password are required.",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const comparePasswords = await bcryptjs.compare(password, user.password);
    if (!comparePasswords) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    user.password = undefined;

    const token = generateToken(user);

    res.status(200).json({ status: "success", token, data: { user } });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: `Error in signin: ${error.message}` });
  }
};
```

### Flow

1. Find the user by email.
2. Include the hidden password.
3. Compare passwords.
4. Generate a JWT.
5. Return the token.

---

## Export

```js
module.exports = { signup, signin };
```

---

## Auth Routes

`routes/auth-routes.js`

```js
const authControllers = require("../controllers/auth-controllers");

const express = require("express");

const multerUpload = require("../middleware/multer-middleware");

const router = express.Router();

router.post("/signup", multerUpload.single("imageUrl"), authControllers.signup);
router.post("/signin", authControllers.signin);

module.exports = router;
```

Register the router:
`index.js`

```js
const authRouter = require("./routes/auth-routes");
app.use("/api/v1/auth", authRouter);
```

Endpoints:

```
POST /api/v1/auth/signup

POST /api/v1/auth/signin
```

---

# Sending JWT in Postman

After signing in:

```
Authorization
Bearer YOUR_TOKEN
```

Example:

```
Authorization:
Bearer eyJhbGciOi...
```

Every protected request must include this header.

---

# Authentication Middleware

Authentication answers:

> **Who is making this request?**

`middleware/authenticate-middleware.js`

```js
const jwt = require("jsonwebtoken");

const authenticateMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticateMiddleware;
```

After verification:

```
req.userId
req.userRole
```

are available in later middleware and controllers.

---

# Authorization Middleware

Authorization answers:

> **Is this user allowed to perform this action?**
> middleware/authorize-middleware.js

```js
const authorizeMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        status: "fail",
        message: "Forbidden",
      });
    }

    next();
  };
};

module.exports = authorizeMiddleware;
```

Examples:

```js
authorizeMiddleware("admin");
```

```js
authorizeMiddleware("student");
```

```js
authorizeMiddleware("admin", "instructor");
```

---

# Protecting Course Routes

Only admins can create, update, or delete courses.

`routes/course-routes.js`

```js
const express = require("express");
const courseControllers = require("../controllers/course-controllers");
const multerUpload = require("../middleware/multer-middleware");
const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize-middleware");

const router = express.Router();

router
  .route("/")
  .get(courseControllers.getAllCourses)
  .post(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    multerUpload.single("imageUrl"),
    courseControllers.createCourse,
  );

router
  .route("/:id")
  .get(courseControllers.getCourseById)
  .patch(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    multerUpload.single("imageUrl"),
    courseControllers.updateCourse,
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    courseControllers.deleteCourse,
  );

module.exports = router;
```

The execution order is:

```
Request
   ↓
Authenticate
   ↓
Authorize
   ↓
Upload Image [if needed]
   ↓
Controller
```

---

# user controllers

## Enroll a Student in a Course

```js
const User = require("../models/user-model");
const Course = require("../models/course-model");

const addCourseToUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ status: "fail", message: "Course not found" });
    }

    const alreadyEnrolled = user.myCourses.some(
      (id) => id.toString() === courseId,
    );

    if (alreadyEnrolled) {
      return res.status(400).json({
        status: "fail",
        message: "Course already added",
      });
    }
    user.myCourses.push(courseId);
    course.students += 1;
    await course.save();
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Course added successfully to your courses",
      data: {
        myCourses: user.myCourses,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error in adding course ${error.message}`,
    });
  }
};
```

## Retrieve User Courses with populate()

```js
const getUserCourses = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("myCourses");
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res
      .status(200)
      .json({ status: "success", data: { myCourses: user.myCourses } });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error in fetching your course ${error.message}`,
    });
  }
};

module.exports = { addCourseToUser, getUserCourses };
```

Without populate:

```json
{
  "myCourses": ["6872ab...", "6872bc..."]
}
```

With populate:

```js
const user = await User.findById(req.userId).populate("myCourses");
```

Result:

```json
{
  "myCourses": [
    {
      "_id": "...",
      "title": "Node.js Fundamentals"
    },
    {
      "_id": "...",
      "title": "MongoDB Basics"
    }
  ]
}
```

`populate()` automatically replaces ObjectIds with the referenced documents.

---

# User Routes

`routes/user-routes.js`

```js
const express = require("express");
const userControllers = require("../controllers/user-controllers");
const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize-middleware");

const router = express.Router();

router
  .route("/courses")
  .get(
    authenticateMiddleware,
    authorizeMiddleware("student"),
    userControllers.getUserCourses,
  )
  .post(
    authenticateMiddleware,
    authorizeMiddleware("student"),
    userControllers.addCourseToUser,
  );

module.exports = router;
```

Register them:
`index.js`

```js
const userRouter = require("./routes/user-routes");
app.use("/api/v1/users", userRouter);
```

# ✅ Summary

- Create a `User` schema with validation rules.
- Hash passwords before saving using `bcryptjs`.
- Generate JWT tokens after successful sign-up or sign-in.
- Protect routes using an authentication middleware that verifies the token.
- Restrict access using an authorization middleware based on user roles.
- Store enrolled course IDs in `myCourses`.
- Use `populate("myCourses")` to fetch complete course documents instead of only ObjectIds.
- Send the JWT in the `Authorization` header as:

```
Bearer <your_token>
```
