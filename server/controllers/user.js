const db = (req) => req.app.get('db');

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const foundUser = await db(req).find_user_by_username([username]);
        const existingUser = foundUser[0];
        if (existingUser) {
            return res.status(409).send('Username taken.');
        } else {
            const hash = bcrypt.hashSync(password); // default 10 salt
            const profilePic = `https://robohash.org/${username}.png`;
            const registeredUser = await db(req).create_user([username, password, profilePic]);
            const user = registeredUser[0];
            req.session.user = {
                id: user.id,
                username: user.username,
                profilePic: user.profile_pic
            };
            return res.status(201).send(req.sesion.user);
        }
    } catch (err) {
        console.log(`Error registering user: ${err}`);
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const foundUser = await db(req).find_user_by_username([username]);
        const existingUser = foundUser[0];
        if (!existingUser) {
            return res.status(401).send('User not found. Please register before attempting to log in.');
        } else {
            const isAuthenticated = bcrypt.compareSync(password, user.hash);
            if (!isAuthenticated){
                return res.status(403).send('Incorrect password!')
            } else {
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    profilePic: user.profile_pic
                }
                return res.status(200).send(req.session.user);
            }
        }
    } catch (err) {
        console.log(`Error loggin in user: ${err}`);
    }
}

const getUser = async (req, res) => {
    try {
        const existingUser = req.session.user;
        if (!existingUser){
            return res.status(404).send('User not found');
        } else {
            return res.status(200).send(existingUser);
        }
    } catch (err) {
        
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.status(200).send('User logged out');
}

module.exports = {
    register, login, getUser, logout
}