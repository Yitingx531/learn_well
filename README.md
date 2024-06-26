# learn_well

## Overview

Learn Well is a simple web application developed for an EdTech company that allows users to create, comment on, and watch educational videos. The application is built using React and interacts with a backend API to provide a seamless and engaging experience for users.

## Features

- Show a list of videos and allow users to select a video from the list.
- Allow users to create a new video object with a title, description, and a video URL.
- Users can comment on videos and view comments from other users.
- Open videos in full screen with full playback functionality.
- Options for adjusting playback speed and volume.
- Search Videos: Users can search for videos by title. When a search term is entered, the video list is filtered to match the search keyword. Clearing the search input will display all videos again.

## Instructions

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Yitingx531/learn_well.git
    cd learn_well
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Running the Application

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

### Notes

- As I do not have local videos to upload, I used YouTube video URLs to create new videos.
- Use your first and last name in snake case as your `user_id` for creating video objects (e.g., John Smith: john_smith).
- **Note:** Since this is for the assessment, I have also pushed the `.env` file to GitHub (which is not best practice). To ensure you can test the app, I have included a mocked `user_id` for the app to run.

## Screenshots

Home Page
![Screenshot 2024-06-25 at 7 27 27 PM](https://github.com/Yitingx531/learn_well/assets/119069886/d99cb871-952a-4733-9754-75081e0639c0)

Page to play single video and display comments, and add comments
![Screenshot 2024-06-25 at 7 29 27 PM](https://github.com/Yitingx531/learn_well/assets/119069886/cf6e269f-4c9e-488f-bcc9-39b4f8c075eb)

Page to view your uploaded videos and edit video info
![Screenshot 2024-06-25 at 7 27 50 PM](https://github.com/Yitingx531/learn_well/assets/119069886/61dc2e2e-c692-45d4-8a1c-1c8e0b312f5d)

Page to create/upload a new video
![Screenshot 2024-06-25 at 7 28 01 PM](https://github.com/Yitingx531/learn_well/assets/119069886/046bd39e-6151-45dd-b3c2-841de75845af)

Section to adjust video's screen size, volume and playback speed
![Screenshot 2024-06-25 at 7 33 32 PM](https://github.com/Yitingx531/learn_well/assets/119069886/e2335e01-8820-427e-a89a-57c588c4f92f)
