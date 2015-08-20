import Relay from 'react-relay';
// viewer here correspond to ChatApp fragments viewer
// 這裡的 viewer 就對應到 ChatApp 所需要的 fragments viewer
export default {
  viewer: (Component) => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer')},
      },
    }
  `,
};
