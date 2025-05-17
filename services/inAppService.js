const sendInApp = async (userId, content) => {
  console.log(`Creating in-app notification for user ${userId}: ${content}`);
  
  return Promise.resolve();
};

module.exports = { sendInApp }; 