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

const insertPost = async (req, res) => {
    const {post, reviewerId, paperId, username} = req.body;

    console.log("\npaperId", paperId);
    console.log("\nreviewerId", reviewerId);

    var sql = "INSERT INTO posts (post, reviewerId, paperId, username) VALUES (?,?,?,?)";

    try {
        const result = await db.query(sql, [post, reviewerId, paperId, username]);

        console.log("!!!!!!!! result: ", result);

        const [p] = await db.query("SELECT * FROM posts WHERE post = ?", [post]);

        console.log("!!!!!!!!!! p: ", p);

        res.status(200).json({ p });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

const getPostsbyPaperId = async (req, res) => {
    const { paperId } = req.body;

    var sql = "SELECT * FROM posts WHERE paperId = ?";

    try {
        //const [rows, fields] = await db.query('SELECT * FROM conferences WHERE paperId = ?', [paperId]);
        const [posts] = await db.query(sql, [paperId]);

        //if (rows.length > 0) {
        //const conference = rows[0]; // i want to get all the information of a conference

        res.status(200).json(posts);


    } catch (error) {
        console.error('Error querying the database in getPostsbyPaperId:', error);
        res.status(400).json({ error: error.message });
       // throw error; // You can handle or log the error as needed
    }
}

/*const getConferencesByAuthor = async (req, res) => {
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
};*/


module.exports = { insertPost, getPostsbyPaperId, /*getConferencesByAuthor, getConferenceById*/ }