// For demo: just simulate
const sendSMS = async (to, content) => {
  console.log(`Sending SMS to ${to}: ${content}`);
  return Promise.resolve();
};

module.exports = { sendSMS }; 