# Image Processing API

A Node.js + TypeScript project for dynamic image resizing and serving using **Sharp**.  
Built for efficiency, scalability, and maintainability, with caching, testing, and clean architecture.

---

## **Table of Contents**

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Starting the Server](#starting-the-server)
- [API Usage](#api-usage)
- [Running Tests](#running-tests)
- [Code Quality](#code-quality)
- [Additional Notes](#additional-notes)

---

## **Overview**

This API allows:

1. Resizing images on-the-fly using URL query parameters.
2. Storing processed images in cache to improve response times.
3. Strong TypeScript typing for robust, maintainable code.
4. Unit and integration tests with Jasmine & SuperTest.

Project maintained by: **Deyaa Banijaber**

---

## **Key Features**

- Dynamically resize images with `width` and `height` query parameters.
- Disk caching for faster repeated requests.
- Robust error handling:
  - Missing filename, width, or height
  - Invalid parameter values
  - Non-existent image files
- Fully typed with TypeScript
- ESLint + Prettier for consistent code style
- Comprehensive unit and integration tests

---

## **Tech Stack**

- Node.js
- Express.js
- TypeScript
- Sharp (image manipulation)
- Jasmine & SuperTest (testing)
- ESLint & Prettier (linting & formatting)

---

## **Folder Structure**

image-processing-api/
│
├─ src/
│ ├─ routes/
│ │ └─ images.ts # API route for image processing
│ ├─ utilities/
│ │ └─ imageProcessing.ts # Functions for resizing using Sharp
│ ├─ tests/
│ │ ├─ helpers/reporter.ts
│ │ └─ indexSpec.ts # Unit & integration tests
│ └─ index.ts # Main server entry point
│
├─ dist/ # Compiled JS (ignore in Git)
├─ node_modules/ # Node dependencies (ignore in Git)
├─ .gitignore
├─ package.json
├─ tsconfig.json
├─ eslint.config.js
└─ README.md

---

## **Setup Instructions**

1. Clone the repository:

````bash
git clone https://github.com/Deyaanoor/Image-Processing-API.git
cd image-processing-api

## **Running the Project**

npm start

---

## **API Usage**

**Endpoint:** `/api/images`

**Query Parameters:**
- `filename` (string) – The name of the image file in the `images/` folder
- `width` (number) – Desired width in pixels
- `height` (number) – Desired height in pixels

**Example URL:**

---


**Workflow:**
1. First request: The image will be resized and stored in cache.
2. Subsequent requests: The cached image will be served directly.

**Error Handling:**
- Missing or invalid parameters → returns a clear error message
- Non-existent image → returns an appropriate error message

---

## **Testing**

To run unit and integration tests:
```bash
npm test


````
