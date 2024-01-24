# Noteline Application

Noteline is an application designed for teachers and students to capture meaningful moments on a timeline during presentations in a classroom setting. It enables asynchronous communication between students and teachers by allowing them to post notes to a shared timeline.

## Table of Contents
- [Features](#features)
- [Personas](#personas)
- [Getting Started](#getting-started)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Usage](#usage)
- [Documentation](#documentation)
  - [Internationalization (i18n)](#internationalization-i18n)
  - [Gesture Navigation](#gesture-navigation)
  - [End Session Details Page](#end-session-details-page)
  - [Message Button, Input, and Action Buttons](#message-button-input-and-action-buttons)
  - [Dynamic Page for Host Dashboard and Student Messages](#dynamic-page-that-can-user-see-host-dashboard-and-students-message)
  - [Join Page and Join Logic](#create-join-page-and-implement-logic-to-join-with-code-only)
  - [New Session Creation Logic with Redux and Firebase](#new-session-creation-logic-and-redux-and-firebase-implement-data-for-new-session)

## Features
- **Capture Session Setup:** Teachers can initiate and create a new session with a unique pin.
- **Host Functionality:** Users can become hosts, generate session pins, and access host-specific controls.
- **Join Session:** Students can join sessions using a session code and access student-specific features.
- **Message System:** Users can send messages, with a counter and time tracking, enhancing interaction.
- **Connected Users:** A feature to display a list of connected users during a session.
- **End Session Details Page:** A page displaying details and information at the end of a session.
- **Gesture Navigation:** Gesture-based navigation for enhanced user experience.
- **Internationalization (i18n):** Support for English and Arabic languages.

## Personas
- **Teacher:** Initiates sessions, accesses host controls.
- **Student:** Joins sessions, interacts with the session content.
- **Administrator:** Monitors system health, renders reports, ensures data integrity.


## Getting Started

### Technologies
React, React DOM, Next.js, React Redux, Redux, Redux Toolkit, Redux Persist, Firebase, Firebase Firestore, React Icons, React Toastify, React Slider, React Swipeable, React Swipeable Views (React 18 Fix), i18next, Next-i18next, React-i18next, Eslint, Eslint Config Next, Commitizen

Styling:
Tailwind CSS, Autoprefixer, PostCSS


### Installation
Installation
Clone the Repository
cd noteapp
Install Dependencies:

```
npm install
```
Run the Application:

```
npm run dev
```

This will start the development server and open the application in your default web browser.

### Usage
### Teacher - Capture Session Setup

1. Log in as a teacher.
2. Navigate to the session setup page.
3. Initiate a new session and note the unique pin.

### Host Functionality

1. Log in as a user.
2. Choose to become a host.
3. Access controls available for hosts.

### Join Session as a Student

1. Log in as a student.
2. Enter the session code provided by the teacher.
3. Join the session and start interacting.

### Message System

- Use the message button to send notes.
- Observe the counters and time tracking for actions.

### Connected Users

- View the list of connected users during a session.

### End Session Details Page

- Navigate to the end session details page at the conclusion of a session.

### Gesture Navigation

- Utilize swipe gestures for seamless navigation.

### Internationalization (i18n)

- Switch between English and Arabic languages using the language switcher.

## Documentation

### Internationalization (i18n)
The application supports internationalization (i18n) to provide a seamless experience for users in different languages. The implementation involves the use of the i18next library for managing translations. Language files for English (`en.json`) and Arabic (`ar.json`) have been created and are located in the `src/locales` directory. The language switcher allows users to dynamically switch between supported languages.

### Gesture Navigation
Gesture navigation has been implemented to enhance user experience. Users can navigate between different sections or views within the application using left and right swipe gestures. The implementation includes smooth animations and responsiveness for various devices and screen sizes.

### End Session Details Page
The end session details page provides a summary of the completed session. It includes information such as session duration, participants, actions taken, and other relevant details.

### Message Button, Input, and Action Buttons
The message components include a button for sending messages, an input field for typing messages, and action buttons with counters and time tracking functionality. Users can interact seamlessly, and the system captures the number of actions and time spent on each action during the session.
### Dynamic Page for Host Dashboard and Student Messages
The dynamic page adjusts its content based on the user's role, displaying either the host dashboard with relevant controls or a section for students to view messages and interact. The page is designed to accommodate the needs of both hosts and students during a session.


### Join Page and Join Logic
The join page allows students to enter a session code and join sessions seamlessly. The join logic handles user input validation, and upon successful entry, students can access the session and begin interaction.


### New Session Creation Logic with Redux and Firebase
The new session creation logic involves setting up Redux for state management, integrating Firebase for real-time data storage, and creating a new session with a unique pin. The application ensures the persistence of data across sessions and provides a seamless experience for both teachers and students.


