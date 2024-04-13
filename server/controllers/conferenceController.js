const db = require('../db/db');

async function checkConf(title) {

    try{
        const [rows, fields] = await db.query('SELECT * FROM conferences WHERE title = ?', [title]);

        if (rows.length > 0) {
            return 0; // this name is in the database
        } else {
            return 1; // this name is not in the database
        }
    } catch (error) {
        return 0;
        console.error('Error querying the database:', error);
        throw error; // You can handle or log the error as needed
    }
}

const insertConference = async (req, res) => {
    const {userId, author, title, acronym, webpage, city, country, firstday, lastday, primaryarea, secondaryarea, organizer} = req.body;

    console.log("Hey: ", title);

    const check = await checkConf(title);

    console.log("check: ", check);

    if(check == 0){
        res.status(400).json({ error: "This conference name exists" })
    }

    var sql = "INSERT INTO conferences (userId, author, title, acronym, webpage, city, country, firstday, lastday, primaryarea, secondaryarea, organizer) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    try {
        const result = await db.query(sql, [userId, author, title, acronym, webpage, city, country, firstday, lastday, primaryarea, secondaryarea, organizer] );

        console.log("result: ", result);

        /*const conference = {
            userId,
            author,
            title,
            acronym,
            webpage,
            city,
            country,
            firstday,
            lastday,
            primaryarea,
            secondaryarea,
            organizer
        };*/
        const [conference] = await db.query("SELECT * FROM conferences WHERE acronym = ?", [acronym]);

        console.log(conference);

        res.status(200).json({ conference });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

const getConference = async (req, res) => {
    const {name} = req.body;

    try {
        const [rows, fields] = await db.query('SELECT * FROM conferences WHERE username = ?', [name]);
        
        if (rows.length > 0) {
          const conference = rows[0]; // i want to get all the information of a conference

          res.status(200).json({conference});

        } else {
            res.status(400).json({error: error.message})
        }
    } catch (error) {
        console.error('Error querying the database:', error);
        throw error; // You can handle or log the error as needed
    }
}

const getConferencesByAuthor = async (req, res) => {
    const { id } = req.params;

    console.log("id: ", id);

    var sql = "SELECT * FROM conferences WHERE author = ?";

    try {
        //const conferences = await db.query(sql, [id]);
        const [conferences] = await db.query(sql, [id]);
        console.log("@. Conferences: ", conferences);

        res.status(200).json(conferences);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const getConferenceById = async (req, res) => {
    const { id } = req.params;

    console.log("id: ", id);

    var sql = "SELECT * FROM conferences WHERE conferenceId = ?";

    try {
        //const conferences = await db.query(sql, [id]);
        const [conference] = await db.query(sql, [id]);
        console.log("@. Conference: ", conference);

        res.status(200).json(conference);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};


module.exports = { insertConference, getConference, getConferencesByAuthor, getConferenceById }