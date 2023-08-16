import { useEffect, useState } from "react";
import SentimentListItem from "../components/TabularListItem";
import { fetchAndProcessSMS } from "../utils/process-sms";

function SpamSMSList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchAndProcessSMS(async (message) => {
        const { source, smsContent } = message;

        const { prediction } = await fetch(
          `http://localhost:5000/spam/${smsContent}`
        ).then((response) => response.json());

        setItems([
          {
            from: source,
            text: smsContent,
            prediction,
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
              header: "Klassifizierung",
              textAlign: "right",
              value: item.prediction,
              percentage: 20,
            },
          ]}
        />
      ))}
    </div>
  );
}

export default SpamSMSList;
