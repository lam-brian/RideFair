# 🚗 RideFair - Web5 Hackathon

## 🚀 Submission

This project was submitted to the Web5: Building the Decentralized Web Hackathon [here](https://devpost.com/software/ridefair).

You can also try out the [live demo](https://ride-fair.vercel.app/) or run it locally.
If there are any issues with the initial load, try clearing the browser history.

1. clone the repository
2. run `npm i`
3. create a .env file and add your own Mapbox access key: VITE_MAPBOX_KEY
4. run `npm run dev`

## 💡 Inspiration

**Problem:**
The travel & transport industry is one of the least trusted industries regarding sharing data (BCG 2022). Knowing that users are most concerned about the misuse of their data by products in the travel and transportation industry, we wanted to tackle this problem space.
To address this critical issue, we identified two main problems: the unethical harvesting and selling of user data and the susceptibility to data breaches. Big companies like Uber and Lyft are harvesting and selling their users’ data, which is incredibly harmful and potentially dangerous to users. In 2018, Uber paid $148 million over a yearlong cover-up of a data breach–affecting 600,000 drivers & 57M users. Similarly, Didi, a ridesharing app in China, was fined $1.2B for violating laws on data security and the protection of personal information. Without the use of Web 5 technologies, millions of users are left vulnerable to data breaches and hacking.

**Solution:**
Our response to this problem is the implementation of TBD5 (Web5) technologies, paving the way for a decentralized ride-sharing platform. Our objective is to create an application that redefines the ride-sharing experience, placing control over personal data firmly in the hands of users, and ensuring a secure and confident travel environment.

**Key Impact:**

1. **Less Susceptible to Algorithm Manipulation:** Your information remains untouched by central entities' algorithms, eliminating targeted ads and unauthorized sales of data that can potentially harm users.
2. **Better Affordability for Drivers and Riders:** Without a central entity taking a substantial cut (as seen with Uber and Lyft's ~25-30%), our decentralized platform allows drivers to earn more, making rides more cost-effective for passengers.
3. **More Safety & Control in Rider-Driver Matching:** Unlike existing apps where rider information is automatically exposed, our platform gives riders the opportunity to choose and match their own drivers based on personal preferences, providing a safer and more controlled experience.

## 🚘 What it does

**Overview:**
RideFair is a decentralized ride-sharing progressive web app (PWA) that empowers users with control over their entire ride-sharing experience, from creating an account, to booking a ride, to selecting their preferred driver—all while maintaining the utmost privacy and security of their personal data.

**Unique Value Feature:**
What sets RideFair apart is the unique ability for riders to freely share associated data with their selected drivers. We prioritize safety by allowing users to share location and personal data, such as name and profile accounts, only with the chosen driver.

**Technological Foundation:**

- Decentralized Identifiers (DIDs): RideFair employs the use of Decentralized Identifiers (DIDs) to ensure that user identifiers are not tied to a central authority during the sign-up process. This enhances user privacy and security.
- Decentralized Web Nodes (DWN): User data is stored securely in decentralized web nodes (DWN), granting users ownership and control over their personal content. This ensures that personal data remains in the hands of its rightful owner.

**MVP Goals**

- **Create an Account:** A seamless onboarding and account creation process that prioritizes user privacy and data ownership.
- **Book a Ride:** Users can easily book rides to their desired destinations, enjoying the flexibility and freedom our platform provides.
- **Select a Driver:** The distinguishing feature of RideFair allows users to select their preferred driver from a list (based on proximity, ratings, and driving experience), emphasizing safety and user choice.
- **Submit Driver Reviews:** Users can review and share their experiences with selected drivers, fostering transparency and accountability.

##⚙️ How we built it
**Design Process:** We started by defining a problem and performing primary research by gathering user research through an online survey. Then, we conducted market research by analyzing competitors in the ridesharing space. After identifying rider and driver pain points and ideating solutions, we created wireframes, a brand style, and prototyped the PWA application using Figma.

**Development Process:** We created our app using Next.js for the front-end, Mapbox for the map, and Web5 to handle our data. Because of how powerful web5 is, there was really no need to incorporate a backend to handle data.

## 💪 Challenges we ran into

- Initially, we wanted to create a React Native project using Expo, however, we had issues using the Web5 API as it seemed to have errors when using an Expo managed workflow.
- Ran into issues trying to implement querying of other DIDs using the app as we had trouble creating our own aggregator.
- Since there were no Web5 ride-sharing apps on the market, we extensively researched and considered numerous use-cases during the product design process. We also had to carefully select and prioritize features that were not only feasible but also had the greatest potential impact.

## 🎉 Accomplishments that we're proud of

Given the one-month time constraint, we are proud of the fact that we were able to learn about cutting-edge, web 5 technologies to create this pwa app from scratch. We also take pride in our product, especially the fact that it addresses such an impactful problem space. In 2023 alone, 234 million people were victims of data compromises. With Ridefair, we are proud to promote user safety and privacy from the dangers that today’s ridesharing technologies pose.

## 📖 What we learned

We learned how to leverage TBD5 technology to help create our solution. In the process, we learned about the constraints of the technology, as well as the additional design and development challenges that are shaped by its unique demands. For example, in order to give users optimal privacy over data, our system needed to adjust to allow users to self-select their own drivers. This made it possible for users to withhold from sharing their data until much later in the process. Users would be able to self-select their drivers and keep their data private until they purchase their ride.

## What's next for RideFair

- **Usability Testing:** We’d love to conduct some usability testing with riders and iterate our design and development process based on the results.
- **New Features:** While designing the app, we thought of creating a rewards and token experience where users can receive rewards and get discounts on their rides on the app to incentivize users to use our app.
- **Driver’s Side:** While our focus was the rider’s experience for the MVP, we would love to optimize the driver’s experience.
- **Crypto Payments**: We'd want to explore integrating crypto payments into the system.
