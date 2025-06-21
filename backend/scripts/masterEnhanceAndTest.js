const mongoose = require('mongoose');
const { enhanceAllData } = require('./enhanceAllData');
const { testRecommendationSystems } = require('./testRecommendations');
const Room = require('../Models/Room');
const Table = require('../Models/Table');
const Menu = require('../Models/Menu');
require('dotenv').config();

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

async function enhanceAndTest() {
    await connectToDB();
    console.log('--- Running Enhancement Scripts ---');
    
    // Step 1: Check current state
    console.log('\n=== STEP 1: CURRENT DATABASE STATE ===');
    const initialRoomCount = await Room.countDocuments();
    const initialTableCount = await Table.countDocuments();
    const initialMenuCount = await Menu.countDocuments();
    
    console.log(`📊 Current Data Counts:`);
    console.log(`   Rooms: ${initialRoomCount}`);
    console.log(`   Tables: ${initialTableCount}`);
    console.log(`   Menu Items: ${initialMenuCount}`);

    // Step 2: Enhance database
    console.log('\n=== STEP 2: ENHANCING DATABASE ===');
    await enhanceAllData();
    
    // Step 3: Verify enhancement
    console.log('\n=== STEP 3: VERIFYING ENHANCEMENT ===');
    const finalRoomCount = await Room.countDocuments();
    const finalTableCount = await Table.countDocuments();
    const finalMenuCount = await Menu.countDocuments();
    
    console.log(`📊 Final Data Counts:`);
    console.log(`   Rooms: ${finalRoomCount} (+${finalRoomCount - initialRoomCount})`);
    console.log(`   Tables: ${finalTableCount} (+${finalTableCount - initialTableCount})`);
    console.log(`   Menu Items: ${finalMenuCount} (+${finalMenuCount - initialMenuCount})`);

    // Display detailed breakdown
    console.log('\n📋 Detailed Breakdown:');
    
    // Room types
    const roomTypes = await Room.aggregate([
      { $group: { _id: '$roomType', count: { $sum: 1 }, avgPrice: { $avg: '$price' } } },
      { $sort: { avgPrice: 1 } }
    ]);
    console.log('\n🏨 Room Types:');
    roomTypes.forEach(type => {
      console.log(`   ${type._id}: ${type.count} rooms, Avg Rs.${Math.round(type.avgPrice)}`);
    });

    // Table types
    const tableTypes = await Table.aggregate([
      { $group: { _id: '$tableType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    console.log('\n🍽️ Table Types:');
    tableTypes.forEach(type => {
      console.log(`   ${type._id}: ${type.count} tables`);
    });

    // Menu categories
    const menuCategories = await Menu.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    console.log('\n🍕 Menu Categories:');
    menuCategories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} items`);
    });

    // Disconnect after enhancement
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB after enhancement.');

    console.log('\\n--- Running Test Scripts ---');
    await connectToDB(); // Reconnect for testing
    await testRecommendationSystems();
    
    // Final disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB after testing.');
}

// Helper function to check if server is running
async function checkServerStatus() {
  try {
    const axios = require('axios');
    await axios.get('http://localhost:8080/api/health');
    return true;
  } catch (error) {
    return false;
  }
}

async function runWithServerCheck() {
  console.log('🔍 Checking if backend server is running...');
  const serverRunning = await checkServerStatus();
  
  if (!serverRunning) {
    console.log('⚠️  Backend server not detected on localhost:8080');
    console.log('📝 Note: Some API tests may fail without running server');
    console.log('💡 To start server: npm start in backend directory');
    console.log('\n🚀 Proceeding with database operations...\n');
  } else {
    console.log('✅ Backend server is running');
    console.log('🚀 Proceeding with full testing...\n');
  }
  
  await enhanceAndTest();
}

if (require.main === module) {
  runWithServerCheck();
}

module.exports = { enhanceAndTest };
