export class Thread extends Object {}
export class Message extends Object {}
export class User extends Object {}

// Mock authenticated ID
export const VIEWER_ID = 'me';

// Mock user data
var viewer = new User();
viewer.id = VIEWER_ID;
export var usersById = {
  [VIEWER_ID]: viewer
};

export var threadsById = {};
export var threadIdsByUser = {
  [VIEWER_ID]: []
};

export var messagesById = {};
export var messageIdsByThread = {};

// Mock raw message data then we can transform
var messages = [
  {
    id: 'm_1',
    threadID: 't_1',
    threadName: 'Jing and Me',
    authorName: 'me',
    text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
    timestamp: Date.now() - 99999
  },
  {
    id: 'm_2',
    threadID: 't_1',
    threadName: 'Jing and me',
    authorName: 'me',
    text: 'Seems like a pretty cool conference.',
    timestamp: Date.now() - 89999
  },
  {
    id: 'm_3',
    threadID: 't_1',
    threadName: 'Jing and me',
    authorName: 'Jing',
    text: 'Sounds good.  Will they be serving dessert?',
    timestamp: Date.now() - 79999
  },
  {
    id: 'm_4',
    threadID: 't_2',
    threadName: 'Dave and me',
    authorName: 'me',
    text: 'Hey Dave, want to get a beer after the conference?',
    timestamp: Date.now() - 69999
  },
  {
    id: 'm_5',
    threadID: 't_2',
    threadName: 'Dave and me',
    authorName: 'Dave',
    text: 'Totally!  Meet you at the hotel bar.',
    timestamp: Date.now() - 59999
  },
  {
    id: 'm_6',
    threadID: 't_3',
    threadName: 'Brian and me',
    authorName: 'me',
    text: 'Hey Brian, are you going to be talking about functional stuff?',
    timestamp: Date.now() - 49999
  },
  {
    id: 'm_7',
    threadID: 't_3',
    threadName: 'Brian and me',
    authorName: 'Brian',
    text: 'At ForwardJS?  Yeah, of course.  See you there!',
    timestamp: Date.now() - 39999
  }
];
// inject raw messages into database
// 這裡我們將 flux-chat 轉成符合 user -> threads -> messages 這樣的結構
// -> : has many
messages.map(mes => {
  let {threadID, threadName, timestamp} = mes;
  // if thread not exists
  if (!threadsById[threadID]) {
    let thread = new Thread();
    thread.id = threadID;
    thread.name = threadName;
    thread.isRead = false;
    thread.lastUpdated = timestamp;
    threadIdsByUser[VIEWER_ID].push(thread.id);
    threadsById[thread.id] = thread;
  }
  // if message are newer than lastUpdated, show update
  // 如果在同一個 thread 裡後面的訊息比較前面新, 更新 lastUpdated
  // 只有在這裡需要, 如果是透過 client 新增訊息, 就直接更新 lastUpdated
  if (timestamp > threadsById[threadID].lastUpdated) {
    threadsById[threadID].lastUpdated = timestamp;
  }
  let message = new Message();
  let {id, authorName, text} = mes;
  message.id = id;
  message.authorName = authorName;
  message.text = text;
  message.timestamp = timestamp;
  messagesById[message.id] = message;
  // if threadID is not defined in messageIdsByThread
  if (!messageIdsByThread[threadID]) {
    messageIdsByThread[threadID] = [];
  }
  messageIdsByThread[threadID].push(message.id);
});
