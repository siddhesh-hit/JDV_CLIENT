import {
  onValue,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
} from "firebase/database";
import { useEffect, useState, useRef } from "react";
import Moment from "react-moment";
import {
  database,
  firebaseapp,
  generateSessionId,
  PostChatmessage,
} from "./firebase";
import { UseUserContext } from "../../UserContextAppProvider";
import "./contact.css";
const ChatRoom = () => {
  const { usertoken, UserData } = UseUserContext();
  const msgBoxRef = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [Roomid, setSessionId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    console.log(usertoken);
    if (UserData) {
      setSessionId(UserData._id);
    }
  }, [usertoken]);
  useEffect(() => {
    if (Roomid) {
      const chatRef = ref(database, `chat/${Roomid}`);
      // Query the chat messages for the current chatroom
      const chatQuery = query(
        chatRef,
        orderByChild("timestamp")
        // limitToLast(100)
      );
      // Listen for changes to the chat messages
      onValue(chatQuery, (snapshot) => {
        const chatData = snapshot.val();
        if (chatData) {
          // Convert the chat data into an array of chat messages
          const messageList = Object.entries(chatData).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          console.log(messageList);
          setMessages(messageList);
          setMessage("");
        }
      });
    }
  }, [Roomid]);
  /*  useEffect(() => {
      const deleteAllDocumentsFromCollection = (collection) => {
        const collectionRef = ref(database, collection);
        set(collectionRef, {})
          .then(() => {
            console.log('All documents deleted successfully');
          })
          .catch((error) => {
            console.log('Error deleting documents:', error);
          });
      };
      // Example usage
      // deleteAllDocumentsFromCollection('roomIds');
      // deleteAllDocumentsFromCollection('DocumentChaser');
      // deleteAllDocumentsFromCollection('Superadmin');
      // eslint-disable-next-line
    }, [Roomid]) 
    */

  const handleChange = (e) => setMessage(e.target.value);
  const handleEnter = (e) => (e.keyCode === 13 ? onSubmit() : "");
  const onSubmit = async () => {
    if (Roomid) {
      const userId = Roomid;
      const newMessage = {
        msg: message,
        usertype: "client",
        username: UserData?.first_name + " " + UserData?.last_name,
        Userid: userId,
        time: Date.now(),
      };
      await PostChatmessage(newMessage, userId);
      // Add the new message to the messages array
      setMessages([...messages, newMessage]);
      setMessage("");
    } else {
      setisLoading(true);
    }
  };
  return (
    <>
      {isOpen ? (
        <div
          className="chat_room_abcds"
          style={{
            zIndex: "999",
            width: "24%",
            position: "fixed",
            right: "0",
            bottom: "0",
          }}
        >
          <div className="shadow bg-white text-dark border rounded">
            <div className="text-center px-3 mb-4 text-capitalize">
              <a onClick={() => setIsOpen(false)} className=" mb-4 ">
                Close
              </a>
            </div>
            <div
              className="bg-light border rounded p-3 mb-4"
              style={{ height: "450px", overflowY: "scroll" }}
            >
              {messages.map((msg) => {
                return (
                  <div className="key" key={msg.id}>
                    {msg.usertype !== "client" && (
                      <div className="row justify-content-end pl-5 ">
                        <div className="d-flex flex-column align-items-end m-2 shadow p-2 bg-info border rounded w-auto">
                          <div>
                            <span>
                              {msg.username}({msg.usertype})
                            </span>
                            <strong className="m-1">{msg.name}</strong>
                            <small className="text-muted m-1">
                              <Moment fromNow>{msg.time}</Moment>
                            </small>
                          </div>
                          <h4 className="m-1">{msg.msg}</h4>
                        </div>
                      </div>
                    )}
                    {msg.usertype == "client" && (
                      <div className="row justify-content-start">
                        <div className="d-flex flex-column m-2 p-2 shadow bg-white border rounded w-auto">
                          <div>
                            <strong className="m-1">{msg.username}</strong>
                            <small className="text-muted m-1">
                              <Moment fromNow>{msg.time}</Moment>
                            </small>
                          </div>
                          <h4 className="m-1">{msg.msg}</h4>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div ref={msgBoxRef}></div>
            </div>
            <div className="form-group d-flex">
                <input
                  type="text"
                  className="form-control bg-light"
                  name="message"
                  onKeyDown={handleEnter}
                  placeholder="Type your message"
                  value={message}
                  onChange={handleChange}
                />
              

              <button
                type="button"
                className="btn btn-warning mx-2"
                onClick={onSubmit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : usertoken ? (
        <div class="float_button_chat">
          <div>
            <img src="https://img1.wsimg.com/dc-assets/live-engage/images/chat-baloon-dark.svg" />
            <a onClick={() => setIsOpen(true)} class="sc-hKMtZM fkfNyW">
              Chat With Us
            </a>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatRoom;
