# Project Description:

---

## Who is it for?

For tourists who are willing to travel accross North America, they can see landscape posts based on the pin on the map they choose. Heat map will highlight the most popular city and tourists can like the posts they viewed.

## What type of data will it store?

-   Three collections in the data base: users & posts & cities
-   User's login credentials, i.e. username, password
-   User's personal information, i.e. email, mobile, facebook/instagram contacts, avatar, joined groups
-   Post content(image,text, “like” number, location (followers number))

## What will users be able to do with this data?

-   Individual users can share and discover landscape and travel trip by post with location directly showed on the map. They can like the post (and comment the post).

## What is some additional functionality you can add/remove based on time constraints?

-   (add)Allow users to connect to a random stranger and have a text-based chat.
-   (remove)Use a heatmap to indicate Hot Travel Location.

---

## Breakdown for two minimal requirements:

### Post Activity:

    1. Creat page (html,css) (login page, main page, post page, create post page,
    2. render form to post the activity
    3. render page(table) to view posted activities

### Accounts

    1. Structure data in database to store account information
    2. Create Sign up and Log in pages
    3. Create Account information and settings page

---

## TO-do List

### Minimal:

-   [x] View posts on a page
-   [x] ordered posts by created date on default
-   [x] Add, delete posts
-   [x] Each contain photos, text content, geolocation, and user name
-   [x] Authentication for users

### Standard:

-   [x] Map with markers to access posts for certain location
-   [x] Use a heapmap to indicate Hot Travel Location
-   [x] Like a post and show like counts
-   [x] allow auto-complete when entering the location
-   [x] users can see the post photos with slide show
-   [x] Can sort post list either by date or by like count
-   [x] Edit user profile
-   [x] allow users to change password
-   [x] page animations for improving user experience

### Stretch:

-   [x] Can search the city by keywords
-   [x] Share to social media and email
-   [x] encrypte user's password for security reason
-   [x] fairly consideration on user behaviors and adjust front-end accordingly
-   [ ] Comments on a post
-   [ ] nearby, message others
-   [ ] In user’s profile, user is allowed to get a stamp for traveling to a city/place. (virtual passport collection)

## Prototypes 🎨

See pdf gotraveldesign

![alt text](design-doc/gotraveldesign1-main-page.jpg)
![alt text](design-doc/gotraveldesign2-post-page.jpg)
![alt text](design-doc/gotraveldesign3-post-detail.jpg)
![alt text](design-doc/gotraveldesign4-add-post.jpg)
![alt text](design-doc/gotraveldesign5-login-page.jpg)
![alt text](design-doc/gotraveldesign6-signup-page.jpg)

## Technologies Used:

### - Unit 1: HTML, CSS, JS

Go Travel used CSS both directly and indirectly to style various components throughout the application, which includes buttons, input box, icons, and transitions based on user behavior with unified style. While we want to create a unique style for the website and be able to adjust to meet our expectation, we didn't choose any public CSS such as Material UI or others. Using CSS inside styled-components makes our React components more readable and uniform. CSS was easier to use for styling than HTML, along with adding design and flexibility to make the UI appear much more stylish and conveniently placed for users.

### - Unit 2: React

Go Travel used React to build the client-facing side of the app. We used components to reduce code duplication and reuse components throughout the app. It was fairly convenient to use hooks in order to achieve complex functionality and response on the page, and also the Redux to easily store and access authentication and application-wide data.

### - Unit 3: Node & Express

Go Travel used Node.js and Express to build out the backend for our application. Node and Express allowed us to operate CRUD behaviors on post data and user info via sending requests. After creating models for our MongoDB database, we are able to send requests with formatted information to the database using Express. Since Express is a minimal framework that builds off of Node, it is easy to use and allowed us to quickly use robust routing, error handling, and middleware on the server side.

### - Unit 4: NoSQL with MongoDB

Go Travel uses a MongoDB backend with custom schemas to store users, posts, and cities information. The flexible nature of NoSQL allowed us to plan a way that we wanted to store information, and make requests to the stored information in the MongoDB Atlas cloud database. With document-based query language and JSON-style information storage, working with and querying the data in our database was quicker and easier than would have been possible using traditional SQL storage considering our documents do not all have a standard layout.

### - Unit 5: Release Engineering

Go Travel uses git and GitHub for version control, with collaborators using different branches to write enhancements and fix bugs. We only push changes to the "main" branch after collaborators manually test enhancements to ensure there are no new bugs introduced. We set up an admin email with a new Heroku account, configuring the "main" branch to automatically deploy changes to the production build through Heroku because Heroku is a simple to use platform that team members were familiar with, and it contains GitHub integration.

## Issues we encountered

1. Since post data were included in city data, it was hard and slow to operate on single post. Therefore, we decide to take a week to split these two types of data and use id to connect them in between and among other modification on the front-end due to this change.

2. While building the project, we were struggling with an async issue between rendering the page with old data and fetching the new data, since fetching would take longer when we have images. In the end, we managed to use a status state and a loading component insert in between to fix the issue.

3.

## Above and Beyond Functionality:

Go travel uses the google-map API, change the color scheme of the map to adapt the style of the website, populates the map with color-coded activity pins, ranks the city with highlighted heatmap, and provides auto-complete for entering locations. Go travel uses react-images-uploading API to achieve the feature of photos uploading on Add Posts page. Go travel uses swiper API allowing slide show of photos. Go travel uses framer-motion API to improve user experience through page animations. Go travel uses react-share API to link to social media and auto-generate sharing content in social media. With Go travel's focus on User Experience and usability, minute details such as the zoom functionality of the map, to the user feedback during any user changes, as well as overall style and responsiveness were not overlooked.

## Next Steps:

-   Make the heatmap more dynamic and interactive, and come up with a better algo to determine the layers.
-   Add a profile picture function for the user and give a user stamp collection function for their posts based on cities to encourage users to post more and travel more.

## List of Contributions:

### [Shawn Gu](https://www.linkedin.com/in/shawn-gu-0b96a2a0/)

-   Web design and UIUX
-   Took responsible for developing a responsive front-end for Main, User, Post list, Post, and Login / Signup pages.
-   Designed and set up the data structure and data flow with Redux and also in React.
-   Coordinated and scheduled meetings, planned work distribution.
-   Deployed the app and performed refactor.
