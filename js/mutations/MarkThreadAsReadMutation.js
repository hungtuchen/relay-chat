import Relay from 'react-relay';

export default class MarkThreadAsReadMutation extends Relay.Mutation {
  // fragments here specify thread, viewer then become this.props in
  // belowing functions, from this point, mutation kind of like
  // a component without rendering
  // 這裡 specify 的 thread, viewer 就成為底下的 functions 可用的 props
  // 從這個角度來看 mutation 其實有點像不會 render 的 component

  static fragments = {
    thread: () => Relay.QL`
      fragment on Thread {
        id,
        isRead
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        threads {
          unreadCount,
        },
      }
    `,
  };

  // here you decide the mutation you wanna use in schema.js
  // you can use different mutation base on different props...
  // 這裡決定你要用什麼在 schema.js 定義過的 mutation
  // 你可以根據不同的 props 用不同的 mutation
  getMutation() {
    return Relay.QL`mutation{markThreadAsRead}`;
  }

  // What's special about FatQuery is that you can specify everything would
  // be changeed based on this muatation, fragment on ... corresponding to
  // the output of the mutation in schema.js
  // FatQuery 很特別的是你可以 specify 所有會因此改變的其他東西,
  // fragment on 後面對應到的是 schema.js 裡 mutation 的 output
  // 可以想成根據 output 來更動所有頁面會因此變動的 field
  getFatQuery() {
    return Relay.QL`
      fragment on MarkThreadAsReadPayload {
        thread {
          isRead,
        },
        viewer {
          threads {
            unreadCount,
          },
        },
      }
    `;
  }

  // getConfigs tell Relay how to handle the payload of this muatation
  // here we specify thread, viewer id to tell Relay there is some change
  // for this two field (thread: isRead, viewer: unreadCount)
  // There are four different types: FIELDS_CHANGE, NODE_DELETE,
  // RANDE_ADD, RANDE_DELETE
  // getConfigs 是告訴 Relay 要以什麼方便來處理這次 mutation 的 payload
  // 這裡我們 specify thread, viewer 的 id 告訴 Relay thread, viewer 這兩個
  // field的狀態都有改變了 (thread: isRead, viewer: unreadCount)
  // 總共有 FIELDS_CHANGE, NODE_DELETE, RANDE_ADD, RANDE_DELETE 四種 types
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        thread: this.props.thread.id,
        viewer: this.props.viewer.id,
      },
    }];
  }

  // variables here is for the input of this mutation in schema.js
  // don't confuse with variables in fragments
  // 這裡的 variables 是 schema.js 裡 mutation 的 input ，別跟 fragments 搞混了
  getVariables() {
    return {
      id: this.props.thread.id,
    };
  }

  // OptimisticResponse is how you wanna do optimistic updates,
  // notice how similar is the shape returned here with FatQuery
  // and you don't need specify every field like FatQuery
  // OptimisticResponse 顧名思義就是你要怎麼作 optimistic updates
  // 注意到這裡 return 的東西跟 FatQuery 的相似性，都是針對 output 要怎麼更新
  // 不過不需要完全跟 FatQuery 一樣， 你可以不會 updates 全部
  getOptimisticResponse() {
    let viewerPayload;
    const {id, threads} = this.props.viewer;
    const {unreadCount} = threads;
    if (threads) {
      viewerPayload = {id: id, threads: {}};
      if (unreadCount != null) {
        viewerPayload.threads.unreadCount = unreadCount > 0 ?
          !this.props.thread.isRead ? unreadCount - 1 : unreadCount
          : 0;
  // make sure no double decrementing on same thread and no minus unreadCount
  // 確保同一個thread不會因為按兩次, unreadCount又被-1一次, 還有不會有負的unreadCount
      }
    }
    return {
      thread: {
        isRead: this.props.isRead,
        id: this.props.thread.id,
      },
      viewer: viewerPayload
    };
  }
}
