import UserService from '../services/user.service.js';

export const RegisterUser = async (req, res) => {
    const {username, password, repeatedPassword, email, profilePicture} = req.body;
    if (password != repeatedPassword) {
        res.status(400).json({"message": "Passwords do not match!"});
        return;
    }
    const userByUsername = await UserService.FindUserByUsername(username);
    if (userByUsername) {
        res.status(400).json({"message": "Username is already taken!"});
        return;
    }
    const userByEmail = await UserService.FindUserByEmail(email);
    if (userByEmail) {
        res.status(400).json({"message":"User with such e-mail is already registered!"});
        return;
    }
    UserService.RegisterUser(username, password, email);
    res.status(200).json({"message": "User registered successfully!"});
}