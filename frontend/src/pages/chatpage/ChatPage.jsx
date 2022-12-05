import "./chat-page.css";
import {
  Flex,
  Avatar,
  AvatarBadge,
  Text,
  Divider,
  Input,
  Button,
} from "@chakra-ui/react";
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useRef, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCG3xrsI2uOU8F8YsqDEPFpH4RddfRBHQQ",
  authDomain: "hostel-wallah-chat.firebaseapp.com",
  projectId: "hostel-wallah-chat",
  storageBucket: "hostel-wallah-chat.appspot.com",
  messagingSenderId: "608181227108",
  appId: "1:608181227108:web:ef9e2e9895b3a31c771971",
  measurementId: "G-56T30WY98K",
};

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

const Messages = ({ messages }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (item.from === "me") {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="black"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Avatar
                name="Computer"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                bg="blue.300"
              ></Avatar>
              <Flex
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

const Header = () => {
  return (
    <Flex w="100%">
      <Avatar size="lg" name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          Ferin Patel
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
    </Flex>
  );
};

const ChatPage = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");
    (async () => {
      await addDoc(collection(db, "chats"), {
        message: inputMessage,
        from:localStorage.getItem("id")
      });
    })();
    // setTimeout(() => {
    //   setMessages((old) => [...old, { from: "computer", text: data }]);
    // }, 1000);
  };

  const [messages, setMessages] = useState([
    // { from: "computer", text: "Hi, My Name is HoneyChat" },
    // { from: "me", text: "Hey there" },
    // { from: "me", text: "Myself Ferin Patel" },
    // {
    //   from: "computer",
    //   text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    // },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  return (
    <>
      <Flex w="100%" h="85vh" justify="center" align="center">
        <Flex w="40%" h="90%" flexDir="column">
          <Header />
          <Divider />
          <Messages messages={messages} />
          <Divider />
          <Footer
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
          />
        </Flex>
      </Flex>
    </>
  );
};
export { ChatPage };
