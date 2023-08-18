export async function fetchAndProcessSMS(callback) {
  const newMessages = await fetch(
    `https://learn-ml.sipgate.cloud:443/io/sms`
  ).then((response) => response.json());

  for (const message of newMessages) {
    console.log(`SMS received:\n${message.smsContent}`);

    await callback(message);
  }
}
