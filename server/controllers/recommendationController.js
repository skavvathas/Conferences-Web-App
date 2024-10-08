const db = require('../db/db');

const getAssignmentByReviewer = async (req, res) => {
    const { conferenceId } = req.body;

    try {
        console.log("!!!!!!!!!!!!!!!\nconferenceId: ", conferenceId);
        // Fetch registrations with specific conferenceId along with reviewer details
        const assignments = await db.query(`
            SELECT r.conferenceId, r.assignment1, r.assignment2, r.assignment3, rev.email, rev.name
            FROM recommendations r
            INNER JOIN reviewers rev ON r.reviewerId = rev.reviewerId
            WHERE r.conferenceId = ?;
        `, [conferenceId]);

        // If no assignments found for the conferenceId, return an empty array
        if (assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for the specified conferenceId' });
        }

        console.log("Assignments: " + assignments);

        // Send the assignments data in the response
        res.status(200).json(assignments);
    } catch (error) {
        // Handle errors
        console.error('Error retrieving assignments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const startRecommendation = async (req, res) => {
    const { conferenceId } = req.body;

    try {
        console.log("!!!!!!!!!!!!!!!\nconferenceId: ", conferenceId);

        // Check the start_recommendation value in the conferences table
        const [conference] = await db.query(`
            SELECT start_recommendation 
            FROM conferences 
            WHERE conferenceId = ?;
        `, [conferenceId]);

        if (!conference) {
            return res.status(404).json({ message: 'Conference not found' });
        }

        if (conference.start_recommendation === 1) {
            return res.status(400).json({ message: 'Recommendation process has already started' });
        }

        // Update start_recommendation to 1
        await db.query(`
            UPDATE conferences 
            SET start_recommendation = 1 
            WHERE conferenceId = ?;
        `, [conferenceId]);

        
        console.log("!!!!!!!!!!!!!!!\nconferenceId: ", conferenceId);
        // Fetch registrations with specific conferenceId along with reviewer details
        const assignments = await db.query(`
            SELECT r.conferenceId, r.assignment1, r.assignment2, r.assignment3, rev.email, rev.name
            FROM recommendations r
            INNER JOIN reviewers rev ON r.reviewerId = rev.reviewerId
            WHERE r.conferenceId = ?;
        `, [conferenceId]);

        // If no assignments found for the conferenceId, return an empty array
        if (assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for the specified conferenceId' });
        }

        console.log("Assignments: " + assignments);

        // Send the assignments data in the response
        res.status(200).json(assignments);
    } catch (error) {
        // Handle errors
        console.error('Error retrieving assignments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getAssignmentByReviewer, startRecommendation }