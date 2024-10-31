import { useEffect, useState } from "react";
import Title from "./Title";
import axios from "axios";
import RecordMessage from "./RecordMessage";

const Controller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [apiStatus, setApiStatus] = useState<string>("");

  const apiUrl = "https://sasha-ai-3771e0eaa1d7.herokuapp.com";

  // Function to create a blob URL from binary data
  function createBlobURL(data: any) {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  }

  // Fetch API health status on component mount
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await axios.get(`${apiUrl}/health`); // Updated endpoint
        setApiStatus(response.data.response); // Update status with API response
      } catch (error) {
        console.error("Error checking API audio:", error);
        setApiStatus("Currently Down");
      }
    };

    checkApiHealth();
  }, []);

  // Handle stopping the recording
  const handleStop = async (blobUrl: string) => {
    setIsLoading(true);
    const myMessage = { sender: "me", blobUrl };
    const messagesArr = [...messages, myMessage];

    // Convert blob URL to blob object
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        // Construct form data to send to the API
        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        // Send form data to the Heroku API
        try {
          const response = await axios.post(`${apiUrl}/post-audio/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Changed to multipart/form-data
            },
            responseType: "arraybuffer", // Set the response type to handle binary data
          });

          const audio = new Audio();
          audio.src = URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
          const sashaMessage = { sender: "sasha", blobUrl: audio.src };
          messagesArr.push(sashaMessage);
          setMessages(messagesArr);
          audio.play();
        } catch (error) {
          console.error("Error posting audio:", error);
        } finally {
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="h-screen overflow-y-hidden">
      {/* Title */}
      <Title setMessages={setMessages} />

      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        {/* API Status */}
        <h1 className="text-center mt-4">API Status: {apiStatus}</h1>

        {/* Conversation */}
        <div className="mt-5 px-5">
          {messages?.map((audio, index) => {
            return (
              <div
                key={index + audio.sender}
                className={
                  "flex flex-col " +
                  (audio.sender === "sasha" ? "flex items-end" : "")
                }
              >
                {/* Sender */}
                <div className="mt-4 ">
                  <p
                    className={
                      audio.sender === "sasha"
                        ? "text-right mr-2 italic text-green-500"
                        : "ml-2 italic text-blue-500"
                    }
                  >
                    {audio.sender}
                  </p>

                  {/* Message */}
                  <audio
                    src={audio.blobUrl}
                    className="appearance-none"
                    controls
                  />
                </div>
              </div>
            );
          })}

          {messages.length === 0 && !isLoading && (
            <div className="text-center font-light italic mt-10">
              Send Sasha a message so she can Help You...
            </div>
          )}

          {isLoading && (
            <div className="text-center font-light italic mt-10 animate-pulse">
              Gimme a few seconds..
            </div>
          )}
        </div>

        {/* Recorder */}
        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-red-800 to-blue-900">
          <div className="flex justify-center items-center w-full">
            <div>
              <RecordMessage handleStop={handleStop} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controller;
