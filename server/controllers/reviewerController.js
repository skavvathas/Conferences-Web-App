const db = require('../db/db');

const insertReviewer = async(req, res) => {
    const {userId, conferenceId, email, name} = req.body;

    var sql = "INSERT INTO reviewers (userId, conferenceId, email, name) VALUES (?,?,?,?)";

    try{
        const result = await db.query(sql, [userId, conferenceId, email, name] );

        const [reviewer] = await db.query('SELECT * FROM reviewers WHERE name = ? AND conferenceId = ?', [name, conferenceId]);

        res.status(200).json({ reviewer });
    } catch(error){
        res.status(400).json({ error: error.message });
    }
}

const getReviewersByConferenceId = async (req, res) => {
    const { id } = req.params;

    console.log("********conferenceId: ", id);

    var sql = "SELECT * FROM reviewers WHERE conferenceId = ?";

    try {
        //const conferences = await db.query(sql, [id]);
        const [reviewers] = await db.query(sql, [id]);
        console.log("@. reviewers: ", reviewers);

        res.status(200).json(reviewers);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {insertReviewer, getReviewersByConferenceId}