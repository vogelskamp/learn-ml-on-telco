export async function fetchAndProcessSMS(callback) {
  const newMessages = await fetch("http://localhost:4000/sms").then(
    (response) => response.json()
  );

  for (const message of newMessages) {
    console.log(`SMS received:\n${message.smsContent}`);

    await callback(message);
  }
}
