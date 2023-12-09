const jwt = require("jsonwebtoken");
const db = require('../db/db');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createToken = (email) => {
    // 3 arguments
    // const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
    console.log("email: ", email);

    const token = jwt.sign({email}, process.env.SECRET, { expiresIn: '10d' });
    return token;

}


/*async function getByUsername(username){

    try {
      const [rows, fields] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length > 0) {
        const user = rows[0];
        return user;
      } else {
        return null; // User not found
      }
    } catch (error) {
      console.error('Error querying the database:', error);
      throw error; // You can handle or log the error as needed
    }
}*/

async function getByUsername(username){

    try {
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        console.log("user in 39 line; ", user);

        if (user) {
            return user;
        } else {
            return null; // User not found
        }
    } catch (error) {
        console.error('Error querying the database:', error);
        throw error; // You can handle or log the error as needed
    }
}

async function checkUsername(username) {

    try{
        const [rows, fields] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length > 0) {
            return 0; // this username is in the database
        } else {
            return 1; // this username is not in the database
        }
    } catch (error) {
        return 0;
        console.error('Error querying the database:', error);
        throw error; // You can handle or log the error as needed
    }
}

// TAKE THE userId when Login or Register

//login user
const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try{
        console.log("helloooooooo!")

        //const result = db.query("SELECT * FROM users WHERE username = ?;", username);

        //console.log("result: ", result);

        getByUsername(username)
            .then(user => {
                if (user) {
                    const token = createToken(user.email);

                    res.status(200).json({user, token});
                } else {
                    console.log('User not found');
                    res.status(400).json({error: error.message})
                }
            })
            .catch(error => {
                res.status(400).json({error: error.message})
            });
        /*(err, result) => {
                console.log("37");
              if (err) {
                res.send({ err: err });
              }

              if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    console.log("44");
                  if (response) {
                    const token = createToken(result[0].email);

                    console.log("48 ", token);
                    res.status(200).json({result});
                  } else {
                    res.status(400).json({ message: "Wrong username/password combination!" });
                  }
                });
              } else {
                res.status(400).json({ message: "User doesn't exist" });
              }
            }
        );*/
        // create token


        //res.status(200).json({result});
    } catch(error){
        res.status(400).json({error: error.message})
    }
}


// sign up
const registerUser = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    const check = await checkUsername(username);

    if(check == 0){
        res.status(400).json({ error: "Username is already in use" });
    }

    var sql = "INSERT INTO users (firstName, lastName, email, username, password) VALUES (?,?,?,?,?)";

    try {
        // Generate a hash for the password
        console.log("HELLO!!!!!!!!")
        
        const hash = await bcrypt.hash(password, saltRounds);

        console.log(hash);
        
        const result = await db.query(sql, [firstName, lastName, email, username, hash] );

        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        /*const user = {
            firstName,
            lastName,
            email,
            username,
            password: hash,
        };*/
        console.log("errr: ", result, user);

        const token = createToken(email);
        console.log("token: ", token);

        res.status(200).json({ user, token});
            //}
        //});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const token = async (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
}

// get the user with a specific username, in order to take the id
// I want the id in the frontend to use it
const getUserByUsername = async (req, res) => {
    const { id } = req.params;

    console.log("id: ", id);

    var sql = "SELECT * FROM users WHERE username = ?";

    try {
        //const conferences = await db.query(sql, [id]);
        const [user] = await db.query(sql, [id]);
        console.log("@. user: ", user);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};




/********************************************************* */
const allUsers = async (req, res) => {
    try{
        const allUsers = await User.find().exec();

        res.status(400).json(allUsers);
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// edit the user with username: prevUsername
const editUser = async (req, res) => {
    const {firstName, lastName, username, prevUsername} = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { username: prevUsername }, // find user by previous username
            { firstName, lastName, username }, // update user fields with new values
            { new: true } // return the updated user
        );
        
        const token = req.headers.authorization.split(' ')[1];

        res.status(200).json({user, token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get the user with username: username
/*const getUserByUsername = async (req, res) => {
    const { username } = req.body;

    try {
      // Assuming you are using a User model with a findByUsername method
      const user = await User.findOne({ username });
      res.status(200).json({user});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/
/***************************************************************************************** */

module.exports = {loginUser, registerUser, token, allUsers, editUser, getUserByUsername}