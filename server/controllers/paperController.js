const db = require('../db/db');

const insertPaper = async(req, res) => {
    const {userId, conferenceId, title, abstract} = req.body;

    var sql = "INSERT INTO paper (userId, conferenceId, title, abstract) VALUES (?,?,?,?)";

    try{
        const result = await db.query(sql, [userId, conferenceId, title, abstract] );

        const [paper] = await db.query('SELECT * FROM paper WHERE title = ? AND conferenceId = ?', [title, conferenceId]);

        res.status(200).json({ paper });
    } catch(error){
        res.status(400).json({ error: error.message });
    }
}

const getPapersByConferenceId = async (req, res) => {
    const { id } = req.params;

    console.log("********conferenceId: ", id);

    var sql = "SELECT * FROM paper WHERE conferenceId = ?";

    try {
        //const conferences = await db.query(sql, [id]);
        const [papers] = await db.query(sql, [id]);
        console.log("@. papers: ", papers);

        res.status(200).json(papers);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {insertPaper, getPapersByConferenceId}