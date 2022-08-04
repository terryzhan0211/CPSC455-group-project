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

-   [x] View posts on a page ordered by newest date by default
-   [x] Add, delete posts. Posts contain photos, travel plan and route
-   [x] Authentication for users

### Standard:

-   [x] Map with pins to access posts for certain location
-   [x] Use a heapmap to indicate Hot Travel Location
-   [x] Like a post and show liking number
-   [x] allow auto-complete when entering the location
-   [x] users can see the post photos with slide show
-   [x] Can sort post list either by date or by like count
-   [x] Edit user profile
-   [x] page animations for improving user experience


### Stretch:

-   [x] Can search by keywords
-   [ ] nearby, message others
-   [x] Share to social media and email
-   [ ] In user’s profile, user is allowed to get a stamp for traveling to a city/place. (virtual passport collection)

## Technologies Used: 

### - Unit 1: HTML, CSS, JS

While we did not use pure HTML except for the index file, Go Travel did use CSS both directly and indirectly to style various components throughout the application. Because we designed the pages of Go travel. Material UI would not match our design perfectly, we have to use pure CSS to meet our sketches. Using CSS inside styled-components makes our React components more readable and uniform. CSS was easier to use for styling than HTML, along with adding design and flexibility to make the UI appear much more stylish and conveniently placed for users. 

### - Unit 2: React

Go Travel used React to build the client-facing side of the app as we did generate the base project using create-react-app. We used components to reduce code duplication and reuse components throughout the app, React hooks in order to achieve complex functionality, and also Redux stores for easy access to authentication and application-wide data.

### - Unit 3: Node & Express

Go Travel used Node.js and Express from Unit 3 to build out the backend for our application. Node and Express allowed us to Create, Read, Update, and Delete posts and user info via sending requests. After creating models for our MongoDB database, we are able to send requests with formatted information to the database using Express. Since Express is a minimal framework that builds off of Node, it is easy to use and allowed us to quickly use robust routing, error handling, and middleware on the server side.

### - Unit 4: NoSQL with MongoDB

Go Travel uses a MongoDB backend with custom schemas to store users, posts, and cities information. The flexible nature of NoSQL allowed us to plan a way that we wanted to store information, and make requests to the stored information in the MongoDB Atlas cloud database. With document-based query language and JSON-style information storage, working with and querying the data in our database was quicker and easier than would have been possible using traditional SQL storage considering our documents do not all have a standard layout.

### - Unit 5: Release Engineering

Go Travel uses git and GitHub for version control, with collaborators using different branches to write enhancements and fix bugs. We only push changes to the "main" branch after collaborators manually test enhancements to ensure there are no new bugs introduced. We set up an admin email with a new Heroku account, configuring the "main" branch to automatically deploy changes to the production build through Heroku because Heroku is a simple to use platform that team members were familiar with, and it contains GitHub integration. 

## Above and Beyond Functionality:

Go travel Using the Google-map API, populates the map with color-coded activity pins, ranks the city with highlighted heatmap, and provides auto-complete for entering locations.  Go travel use react-images-uploading API to achieve the feature of photos uploading on Add Posts page. Go travel uses swiper API allowing slide show of photos. Go travel uses framer-motion API to improve user experience through page animations. Go travel use react-share API to link to social media and auto-generate sharing content in social media. With Go travel's focus on User Experience and usability, minute details such as the zoom functionality of the map, to the user feedback during any user changes, as well as overall style and responsiveness were not overlooked.

## Next Steps:

## List of Contributions:

## Prototypes 🎨

See pdf gotraveldesign

![alt text](design-doc/gotraveldesign1-main-page.jpg)
![alt text](design-doc/gotraveldesign2-post-page.jpg)
![alt text](design-doc/gotraveldesign3-post-detail.jpg)
![alt text](design-doc/gotraveldesign4-add-post.jpg)
![alt text](design-doc/gotraveldesign5-login-page.jpg)
![alt text](design-doc/gotraveldesign6-signup-page.jpg)
