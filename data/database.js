import {Message, VIEWER_ID, usersById, threadsById, threadIdsByUser,
  messagesById, messageIdsByThread} from './data';

export function addMessage(text, currentThreadID) {
  var timestamp = Date.now();
  var message = new Message();
  message.id = 'm_' + timestamp;
  message.authorName = 'me'; // hard coded for the example
  message.text = text;
  message.timestamp = timestamp;

  threadsById[currentThreadID].isRead = true;
  threadsById[currentThreadID].lastUpdated = timestamp;

  messagesById[message.id] = message;
  messageIdsByThread[currentThreadID].push(message.id);

  return {
    messageID: message.id,
    threadID: currentThreadID
  };
}

export function markThreadAsRead(id) {
  var thread = getThread(id);
  thread.isRead = true;
}

export function getThread(id) {
  return threadsById[id];
}

export function getThreads() {
  let orderedThreads = threadIdsByUser[VIEWER_ID].map(id => getThread(id));
  // let newer thread get lower index
  orderedThreads.sort((x, y) => {
    return x.lastUpdated > y.lastUpdated ?
      -1 : x.lastUpdated < y.lastUpdated ? 1 : 0;
  });
  return orderedThreads;
}

export function getMessage(id) {
  return messagesById[id];
}

export function getMessagesByThreadId(threadID) {
  let orderedMessages = messageIdsByThread[threadID].map(id => getMessage(id));
  // let newer message get higher index
  orderedMessages.sort((x, y) => {
    return x.timestamp < y.timestamp ? -1 : x.timestamp > y.timestamp ? 1 : 0;
  });
  return orderedMessages;
}

export function getUser(id) {
  return usersById[id];
}

export function getViewer() {
  return getUser(VIEWER_ID);
}
