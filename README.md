# Architecture
## Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
- For the user frontend, I used handlebars to modularize the html into partials and templates. This way, I could re-use html code for the layout, header, and footer on each specific view template. This keeps the code DRY(do not repeat yourself) and improves the maintainability. 

- For the admin frontend, I used Angular to build a SPA. When setting up an angular app, you start off with a lot more files then an express app. Furthermore, the process seems very optimized for the frontend. For instance, when you generate a component, you are provided with a HTML, CSS, and typescript file for the component. I prefer using a frontend framework or library to do frontend work, but both approaches are viable approaches. It is best to choose the approach that matches your skillset and aligns with the project.
##	Why did the backend use a NoSQL MongoDB database?
-	It is to my understanding that this project required us to us the MEAN(MongoDB, Express, Angular, Node) stack. This allows for a simpler development process, since all technologies in the stack use a single language, JavaScript. This project could have been done using a relational database, but that would most likely mean using a different language for the backend.
# Functionality
##	How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
-	JSON (JavaScript Object Notation) is a data-interchange format that is easy for humans to read and write and easy for machines to parse and generate, while JavaScript is a programming language. JSON is a subset of JavaScript's object literal notation but is language-agnostic so it can be used in many programming environments. JSON serves as a common format for sending and receiving data between the frontend and backend, enabling seamless data exchange and integration between the two.
##	Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.
-	I refactored the layout, header, and footer html into handlebars partial files. This allowed me to re-use these partial files in multiple view templates for the user frontend. By doing this, I kept the code DRY and easier to maintain.
Testing
##	Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.
-	For testing restful API endpoints, I’d specify the endpoints and behavior within express, and then test the endpoints in postman. When I added a layer of security, it meant that I needed to get the appropriate jwt token and pass it as bearer token on the Authorization header for protected endpoiints. The most common HTTP request methods are GET, POST, PUT, and DELETE. GET retrieves data, POST adds or updates data, PUT updates data, and DELETE removes data.
Reflection
##	How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?
-	Completing this course has advanced me towards my bachelor's degree in Computer Science. While I usually work with React, learning Angular has broadened my frontend expertise. Building a full-stack app has also deepened my backend understanding, enhancing my skills as a fullstack developer.
