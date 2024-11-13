# Hostel Management System

This is the frontend for a Hostel Management system built using React and React Router. The application allows users to book rooms, create complains, and manage the  rooms and staffs, while admin can manage complanies, post room. Admin users have access to an additional interface for managing rooms.

### Demo Credentials:-

````
    Student Username:  steffynajones@gmail.com
    Student Password: Bhanu123
````

`````
    staff Username: lalitha@gmail.com
    staff Password: Lalitha123
`````

`````
   Admin Username: admin@gmail.com
   Admin Password: Admin123
`````
Backend Code: [https://github.com/Bhanushri2197/hostelManagement-backend]


### Features
----
#### Student Interface:

+ Browse rooms and book the room.
+ create complains  .
+ contact us.
+ payment

````
    Student Username:  steffynajones@gmail.com
    Student Password: Bhanu123
````

<img width="941" alt="image" src="https://github.com/user-attachments/assets/570fbe84-d56c-4112-9d6d-768efd161adf">



#### Staff Interface:

+ Manage complains and complete .
+ Assigned complains listed in profile page

  `````
    staff Username: lalitha@gmail.com
    staff Password: Lalitha123
  `````





#### Admin Interface:

+ Manage hostel and complains via a dedicated admin dashboard.


`````
   Admin Username: admin@gmail.com
   Admin Password: Admin123
`````
<img width="938" alt="image" src="https://github.com/user-attachments/assets/cf29cac1-03ba-4668-bd82-170316e5a4a1">




### Technologies Used

+ React
+ React Router for navigation
+ Redux
+ NodeJs
+ MongoDB
+ Cloudnary
+ React-stripe-checkout
+ Formik
+ Axios


### Routing Setup
This application uses `react-router-dom` for navigation between different pages. Below is the routing configuration:

#### Main Routes

+ `/` - Home page
+ `/login` - Login page
+ `/sign-in` - Signup page
+ `/rooms` - Rooms List page
+ `/complains` - Complains created by logged user
+ `/add-complain` - Create Complains
+ `/contact-us` - Contact us
+ `/payment` - Payment
+ `/my-profile/:id` - Profile page (Click profile img)


#### Admin Routes

+ `/admin/dashboard/complain`  - List all complains
+ `/admin/dashboard/students` - List all Residents
+ `/admin/dashboard/rooms` - List all Room list
+ `/admin/dashboard/rooms/add-room` - Create new Room Details
+ `/admin/dashboard/booking` - List all Booking Request and its Status
+ `/admin/dashboard/notification` - List all notification shown in notification dropdown in navbar

