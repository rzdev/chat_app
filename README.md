# Live Chat Web App

## Date of submission
30 Aug 2023

## Instructions to run assignment locally
**Note:** Please make sure to have Docker installed on your machine.

- On the root directory of this project, run `docker compose up`.
  For the initial process it might take longer around 15s-30s to download and to build all the required packages.
- Once all the required Docker Images has been downloaded & built, it will start MongoDB, the Back-End service & the Front-End Application.
- On your browser, navigate to http://localhost:5173/ to open the Live Chat Web App.
  
<br/>

## Time spent
I've spent around 4-5 hours working on the Front-end side, and then 5 hours on the Back-end side.

## Assumptions made
According to the requirements for Login Page written on Figma, "User cannot user the same username that is currently inside a room (used by someone else)", I assumed that once a username exits the room then a username become available again.

But the requirements also mentioned "Clicking JOIN button, should load the ChatRoom page, a validation must be performed before loading the page, Username and RoomID cannot be empty & Username cannot be already taken", I'm not sure about the definition of already taken username, so then I assumed if a username has post a message, then that Username is considered taken.

## Shortcuts/Compromises made
For this demo project, my approach is to keep it as simple as possible while still fulfilling all the requirements. For a real-world production-ready application, I would make the following changes:

- Better Authentication: Currently i'm using a fairly basic authentication using a simple JWT token mechanism. For a real world application i would change it to a more robust solusion for example using Clerk / Passport.
- Unit Tests: For a real world application i would write test cases to ensure everying functions properly as intended.

## Assume your application will go into production...

### What would be your approach to ensuring the application is ready for production (testing)?
I would create unit tests both for the front-end and back-end application, as well as e2e (end to end) tests. Both of these tests will be implemented on the CI pipeline to ensure everyting is tested. To make sure everying functions properly as intended.

If applicable, also work with QA Engineers to determine the tests scenarios, including positive tests, negative tests and other edge cases.

### How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?
- I would make sure that the app (Front-End & Back-End) have follow all the best practises and tested before deploying to production.
- Do a stress test with high number of traffic on a test environment.
- From Architecture point of view, need decide what would be the best approach, go with microservices or other solutions such us serverless. Need to have the ability to auto-scale to cope with the high traffic.
- High number of traffic also means lots of data/insight that can be captured/monitored. There are tools such as Sentry,AWS/GCP services that can help to monitor our application. These information can later be used to determine what actions needed to be done.

### What key steps would you take to ensure application security?
- Use Encryption (HTTPS/SSL)
- Enforce strong authentication (prevent weak passwords, 2FA, etc).
- Validate & sanitize user inputs, to prevent malicious attacks such us SQL injection or XSS.
- Configure services for example Web Server to not expose sensitive information such as name, version, etc.
- Store sensitive information such as API Key & Secret in an environment variable or a secret manager 

## What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.
None.

## Other information about your submission that you feel it's important that we know if applicable.
It's not part of the requirements but I've added a feature so that once a user enter a chat room and closed their browser or do a browser refresh, once the user visited the chat application again the user will be not be signed-out instead they will be taken to their previous session / chat room.

## Your feedback on this technical challenge
The requirements for the Login page can be more clarified, as I had some difficulty understanding it as i have mentioned in the **Assumptions made** section. Also would be great if there's a design guide for the error message for the taken username.

