// scripts/verifySystem.js
const mongoose = require('mongoose');
const Room = require('../Models/Room');
const User = require('../Models/User');
const UserRoomInteraction = require('../Models/UserRoomInteraction');
const RoomRecommendation = require('../Models/RoomRecommendation');
require('dotenv').config();

async function verifySystem() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully for system verification.');

        console.log('🔍 COMPLETE SYSTEM VERIFICATION\n');
        
        // Check Room Data
        const rooms = await Room.find({});
        console.log(`✅ Room Data: ${rooms.length} rooms found`);
        
        if (rooms.length === 0) {
            console.log('❌ No rooms found! Run createFreshRoomData.js first');
            return;
        }

        // Verify room fields
        const sampleRoom = rooms[0];
        const requiredFields = ['roomNumber', 'roomType', 'price', 'averageRating', 'totalRatings', 'capacity', 'amenities'];
        const missingFields = requiredFields.filter(field => sampleRoom[field] === undefined);
        
        if (missingFields.length === 0) {
            console.log('✅ Room Field Alignment: PERFECT');
        } else {
            console.log(`❌ Missing Room Fields: ${missingFields.join(', ')}`);
        }

        // Check Test Users
        const testUsers = await User.find({ email: { $regex: '@test.com$' } });
        console.log(`✅ Test Users: ${testUsers.length} users found`);
        
        if (testUsers.length === 0) {
            console.log('❌ No test users found! Run createTestingData.js first');
            return;
        }

        // Check User Interactions
        const interactions = await UserRoomInteraction.find({});
        console.log(`✅ User Interactions: ${interactions.length} interactions found`);

        // Verify interaction distribution
        const interactionStats = await UserRoomInteraction.aggregate([
            { $group: { _id: '$interactionType', count: { $sum: 1 } } }
        ]);
        
        console.log('📊 Interaction Distribution:');
        interactionStats.forEach(stat => {
            console.log(`  ${stat._id}: ${stat.count} interactions`);
        });

        // Check room popularity scores
        const popularRooms = await Room.find({}).sort({ popularityScore: -1 }).limit(3);
        console.log('\n🏆 Top 3 Popular Rooms:');
        popularRooms.forEach((room, index) => {
            console.log(`  ${index + 1}. Room ${room.roomNumber} (${room.roomType}) - Score: ${room.popularityScore.toFixed(1)}, Rating: ${room.averageRating}⭐`);
        });

        // API endpoints will be tested when backend is running
        console.log('\n🌐 API Endpoints: Ready for testing when backend starts');

        // Verify user patterns
        console.log('\n👥 User Pattern Verification:');
        for (const user of testUsers) {
            const userInteractions = await UserRoomInteraction.find({ userId: user._id });
            const interactionTypes = [...new Set(userInteractions.map(i => i.interactionType))];
            console.log(`  ${user.name}: ${userInteractions.length} interactions (${interactionTypes.join(', ')})`);
        }

        // Check room type distribution
        const roomTypeStats = await Room.aggregate([
            { $group: { _id: '$roomType', count: { $sum: 1 }, avgPrice: { $avg: '$price' } } },
            { $sort: { avgPrice: 1 } }
        ]);
        
        console.log('\n🏨 Room Type Distribution:');
        roomTypeStats.forEach(stat => {
            console.log(`  ${stat._id}: ${stat.count} rooms, Avg: Rs. ${Math.round(stat.avgPrice).toLocaleString('en-PK')}`);
        });

        // Verify PKR currency formatting
        console.log('\n💰 Currency Verification:');
        const priceRange = {
            min: Math.min(...rooms.map(r => r.price)),
            max: Math.max(...rooms.map(r => r.price))
        };
        console.log(`  Price Range: Rs. ${priceRange.min.toLocaleString('en-PK')} - Rs. ${priceRange.max.toLocaleString('en-PK')}`);

        // Check image paths
        const roomsWithImages = rooms.filter(r => r.image && r.image.includes('/uploads/'));
        console.log(`✅ Rooms with Images: ${roomsWithImages.length} rooms found`);
    } catch (error) {
        console.error('System verification failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

verifySystem();
