const db = require('../db/db');

/*const insertPaper = async(req, res) => {
    const {title, abstract} = req.body;

    var sql = "INSERT INTO paper (title, abstract) VALUES (?,?,)";

    try{
        const result = await db.query(sql, [title, abstract] );

        const [paper] = await db.query('SELECT * FROM paper WHERE title = ?', [title]);

        res.status(200).json({ paper });
    } catch(error){
        res.status(400).json({ error: error.message });
    }
}*/

const insertPaper = async (req, res) => {
    const { conferenceId, title, abstract } = req.body;

    try {
        // Check if paper with given title already exists
        const [existingPaper] = await db.query('SELECT * FROM paper WHERE title = ?', [title]);
        if (existingPaper.length > 0) {
            return res.status(400).json({ error: 'Paper with this title already exists' });
        }

        // If paper doesn't exist, insert it into the database
        const sql = "INSERT INTO paper (title, abstract) VALUES (?,?)";
        const result = await db.query(sql, [title, abstract]);

        // Fetch the inserted paper
        // WHY IS NULL?l
        const [paper] = await db.query('SELECT * FROM paper WHERE title = ?', [title]);
        console.log("insertPaper paperId: ", paper[0].paperId);
        console.log("insertPaper paper: ", paper);

        // Insert entry into the recommendations table
        const sql2 = "INSERT INTO conferencetopapers (conferenceId, paperId) VALUES (?, ?)";
        const result1 = await db.query(sql2, [conferenceId, paper[0].paperId]);
        console.log("result1: ", result1);

        res.status(200).json({ paper });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


/*const getPapersByConferenceId = async (req, res) => {
    const { id } = req.params;

    console.log("********conferenceId: ", id);

    var sql = "SELECT * FROM conference WHERE conferenceId = ?";

    try {
        //const conferences = await db.query(sql, [id]);
        const [papers] = await db.query(sql, [id]);
        console.log("papers: ", papers);

        res.status(200).json(papers);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};*/

// get all the papers from a specific paper
const getPapersByConferenceId = async (req, res) => {
    const { id } = req.params;

    console.log("********conferenceId: ", id);

    var sql = `
        SELECT paper.paperId, paper.title, paper.abstract
        FROM paper
        INNER JOIN conferencetopapers ON paper.paperId = conferencetopapers.paperId
        WHERE conferencetopapers.conferenceId = ?`;

    try {
        const [papers] = await db.query(sql, [id]);
        console.log("papers: ", papers);

        res.status(200).json(papers);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const getPaper = async (req, res) => {
    //const { id } = req.params;
    const { paperId } = req.body;

    console.log("**00**paperId: ", paperId/*id*/);

    var sql = "SELECT * FROM paper WHERE paperId = ?";

    try {
        //const conferences = await db.query(sql, [id]);
        const [paper] = await db.query(sql, [paperId]);
        console.log("@. paper: ", paper);

        res.status(200).json(paper);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { insertPaper, getPapersByConferenceId, getPaper }