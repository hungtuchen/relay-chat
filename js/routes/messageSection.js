import Relay from 'react-relay';
// viewer, thread here correspond to MessageSection fragments viewer. thread
// 這裡的 viewer. thread 就對應到 MessageSection 所需要的 fragments viewer. thread
export default {
  thread: () => Relay.QL`
    query {
      node(id: $id)
    }
  `,
  viewer: () => Relay.QL`
    query {
      viewer
    }
  `,
};
