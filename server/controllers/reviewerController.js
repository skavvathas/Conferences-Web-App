const db = require('../db/db');

const insertReviewer = async (req, res) => {
    const { conferenceId, name, email } = req.body;

    try {
        // Check if reviewer with the given email already exists
        const [existingReviewer] = await db.query('SELECT * FROM reviewers WHERE email = ?', [email]);
        if (existingReviewer.length > 0) {
            // If reviewer already exists, return the existing reviewer
            return res.status(200).json({ reviewer: existingReviewer[0] });
        }

        // If reviewer doesn't exist, insert it into the database
        const sql1 = "INSERT INTO reviewers (name, email) VALUES (?, ?)";
        const result = await db.query(sql1, [name, email]);

        // Fetch the inserted reviewer
        const [reviewer] = await db.query('SELECT * FROM reviewers WHERE email = ?', [email]);

        // Insert entry into the recommendations table
        const sql2 = "INSERT INTO recommendations (reviewerId, conferenceId) VALUES (?, ?)";
        await db.query(sql2, [reviewer[0].reviewerId, conferenceId]);

        res.status(200).json({ reviewer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getReviewersByConferenceId = async (req, res) => {
    const { id } = req.params;

    console.log("********conferenceId: ", id);

    var sql = `
        SELECT reviewers.*
        FROM reviewers
        INNER JOIN recommendations ON reviewers.reviewerId = recommendations.reviewerId
        WHERE recommendations.conferenceId = ?`;

    try {
        const [reviewers] = await db.query(sql, [id]);
        console.log("@. reviewers: ", reviewers);

        res.status(200).json(reviewers);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};


module.exports = {insertReviewer, getReviewersByConferenceId}