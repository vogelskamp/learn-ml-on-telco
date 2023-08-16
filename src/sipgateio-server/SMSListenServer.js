const { createHistoryModule, sipgateIO } = require("sipgateio");
const { HistoryEntryType } = require("sipgateio/dist/history");

const dotenv = require("dotenv");
dotenv.config();

const PORT = 4000;

const app = require("express")();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

if (!process.env.SIPGATE_TOKEN_ID) {
  throw new Error(`No SIPGATE_TOKEN_ID provided`);
}

if (!process.env.SIPGATE_TOKEN) {
  throw new Error(`No SIPGATE_TOKEN provided`);
}

const sipgateio = sipgateIO({
  tokenId: process.env.SIPGATE_TOKEN_ID,
  token: process.env.SIPGATE_TOKEN,
});

const historyModule = createHistoryModule(sipgateio);

app.get("/sms", async (req, res) => {
  const newMessages = await historyModule.fetchAll({
    types: [HistoryEntryType.SMS],
    directions: ["INCOMING"],
    archived: false,
  });

  historyModule.batchUpdateEvents(newMessages, () => ({
    archived: true,
  }));

  res.json(newMessages).end();
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
