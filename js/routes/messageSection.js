import Relay from 'react-relay';
// viewer, thread here correspond to MessageSection fragments viewer. thread
// 這裡的 viewer. thread 就對應到 MessageSection 所需要的 fragments viewer. thread
export default {
  thread: (Component) => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('thread')},
      },
    }
  `,
  viewer: (Component) => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer')},
      },
    }
  `,
};
