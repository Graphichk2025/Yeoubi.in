const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yeoubi')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const seedAdmin = async () => {
    try {
        const adminEmail = 'admin@yeoubi';
        const adminPassword = 'admin@yeoubi@123';

        let admin = await User.findOne({ email: adminEmail });
        if (admin) {
            console.log('Admin user already exists');
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        admin = new User({
            email: adminEmail,
            password: hashedPassword,
            isAdmin: true
        });

        await admin.save();
        console.log('Admin user created successfully');
        process.exit();
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
};

seedAdmin();
