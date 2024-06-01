## Start with the application

The user in order to begin the journey locally in his PC, should open 2 terminals inside the ```client``` ans ```server``` folders. In each terminals should type the 2 following commands: ```npm i``` in order all the node_modules to be installed and ```npm start``` in order the client and the server to begin building.

## About MySQL server, MySQL Workbench and schemas.sql file

To create multiple tables in MySQL Server using MySQL Workbench and import the provided SQL file, follow these steps:

1. Open MySQL Workbench and connect to your MySQL Server.
2. Navigate to your desired database or create a new one if needed.
3. Go to the "File" menu and select "Open SQL Script." Then, locate and open the ```shemas.sql``` file.
4. Review the SQL commands.
5. Click the lightning bolt icon in the toolbar or choose "Execute" from the SQL menu to run the selected SQL commands. This will create the tables in your MySQL database.

### Tables Overview:

The database comprises several tables, each serving a distinct purpose:

- **Conferences:** Stores information about conferences, including details such as title, location, and dates.
- **ConferenceToPapers:** Represents the relationship between conferences and papers, allowing multiple papers to be associated with a single conference.
- **Paper:** Contains details of individual papers submitted to conferences, including titles and abstracts.
- **Posts:** Stores posts made by reviewers regarding specific papers, aiding in the review process.
- **Recommendations:** Tracks recommendations made by reviewers for conferences, facilitating decision-making.
- **Reviewers:** Stores information about reviewers, including their contact details and names.
- **Users:** Contains user information for accessing and interacting with the system.

## Really Important notice

The user need to add a file with name : ```.env``` in the server folder. A .env file in a React project is used to store environment variables, providing a way 
to configure and manage settings such as API keys or server URLs. 

The author has used this '.env' file: 

PORT = 4000
SECRET = asdfghjjytredcvhj






