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
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';

class MessageSection extends React.Component {

  render() {
    const {thread, thread: {messages: {edges, pageInfo}}, viewer} = this.props;
    const messageListItems = edges.map(edge => {
      return (
        <MessageListItem
          key={edge.node.id}
          message={edge.node}
        />
      );
    });
    console.log('hasPreviousPage', pageInfo.hasPreviousPage);
    return (
      <div className="message-section">
        <h3 className="message-thread-heading">{thread.name}</h3>
        <ul className="message-list" ref="messageList">
          { pageInfo.hasPreviousPage ?
            <div onClick={this._handleLoadMoreOnClick}>
              Load more
            </div> :
            null
          }
          {messageListItems}
        </ul>
        <MessageComposer messagesNumber={this.props.relay.variables.number}
          thread={thread} viewer={viewer}/>
      </div>
    );
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    var ul = ReactDOM.findDOMNode(this.refs.messageList);
    ul.scrollTop = ul.scrollHeight;
  }

  _handleLoadMoreOnClick = () => {
    this.props.relay.setVariables({
      number: this.props.relay.variables.number + 1,
    });
  }

}

export default Relay.createContainer(MessageSection, {
  // Specify the initial value of the `$cursorString` variable which is null
  // As there is no 'before' needed for first loading
  // 這裡我們 specify 'before' 後面所需要的 cursorString 以便作 pagination
  // 一開始沒有東西 before, 所以就設定 initial 為 null
  initialVariables: {
    number: 1,
    // cursorString: null
  },
  fragments: {
    thread: () => Relay.QL`
      fragment on Thread {
        name
        messages(last: $number) {
          edges {
            node {
              id
              ${MessageListItem.getFragment('message')}
            }
          }
          pageInfo {
            hasPreviousPage
          }
        }
        ${MessageComposer.getFragment('thread')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${MessageComposer.getFragment('viewer')}
      }
    `
  }
});
