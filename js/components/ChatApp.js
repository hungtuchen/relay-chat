/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react';
import Relay from 'react-relay';
import { PropTypes } from 'react-router';
import ThreadSection from './ThreadSection';
import MessageSection from './MessageSection';

class ChatApp extends React.Component {

  static contextTypes = {
    history: PropTypes.history,
  }

  componentWillMount() {
    // by default, set threads[0].id to currentID if pathname === '/'
    // 如果 route 是'/'的時候自動把 route 轉到 threads[0] 的 id 對應到的
    // 'thread/:id' 去，因為目前無法在更上層 access 到 這個 id, 所以先這樣做
    // TODO: better if we can do it in route config
    const currentThreadID = this.props.viewer.threads.edges[0].node.id;
    if (window.location.pathname === '/' ) {
      this.context.history.pushState(null, `/thread/${currentThreadID}`);
    }
  }

  render() {
    // the specified fragments below would be this.props here
    // Note: Relay ask you to pass props(ex: thread) to child component
    // if it need to use this fragement(thread), think it as corresponding
    // ThreadSection.getFragment... belowing
    // 下面 specify 的 fragments 會變成這裡的 this.props
    // 注意： Relay 要求你在下層(ex: ThreadSection)用到的 fragments
    // 這裡要當 props 傳下去, 可以想成要跟 ThreadSection.getFragment...對應到
    const {viewer, viewer: {threads}} = this.props;
    return (
      <div className="chatapp">
        <ThreadSection threads={threads} viewer={viewer}/>
        {this.props.children}
      </div>
    );
  }

}

export default Relay.createContainer(ChatApp, {
  fragments: {
    // Note: Relay will ask you to specify first, last, before, or after
    // if you need to query to edges, so we set a big number here
    // 注意：Relay 會要你 specify specify first, last, before, 或 after
    // 如果你要 query 任何 edges 裡的東西, 所以我們這裡假定一個很大的數
    viewer: () => Relay.QL`
      fragment on User {
        threads(first: 2147483647) {
          edges {
            node {
              id,
            },
          },
          ${ThreadSection.getFragment('threads')}
        },
        ${ThreadSection.getFragment('viewer')},
        ${MessageSection.getFragment('viewer')}
      }
    `
  },
});
