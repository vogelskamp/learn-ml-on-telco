import { useEffect, useState } from "react";
import SentimentListItem from "../components/TabularListItem";
import { fetchAndProcessSMS } from "../utils/process-sms";

function SentimentAnalysisList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchAndProcessSMS(async (message) => {
        const { source, smsContent } = message;

        const { emoji, score } = await fetch(
          `https://learn-ml.sipgate.cloud:443/flask/sentiment/${smsContent}`
        ).then((response) => response.json());

        console.log(score);
        setItems([
          {
            from: source,
            text: smsContent,
            emoji,
            score,
          },
          ...items,
        ]);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [items, setItems]);

  return (
    <div className="content-list">
      {items.map((item) => (
        <SentimentListItem
          items={[
            {
              header: "Absender",
              textAlign: "left",
              value: item.from,
              percentage: 20,
            },
            {
              header: "Text",
              textAlign: "left",
              value: item.text,
              percentage: 60,
            },
            {
              header: "Sentiment",
              textAlign: "center",
              value: item.emoji,
              percentage: 10,
            },
            {
              header: "Score",
              textAlign: "right",
              value: item.score.toFixed(3),
              percentage: 10,
            },
          ]}
        />
      ))}
    </div>
  );
}

export default SentimentAnalysisList;
