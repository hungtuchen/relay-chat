import React from 'react';
import Relay from 'react-relay';
import {Route} from 'react-router';
import relayNestedRoutes from 'relay-nested-routes';
import ChatApp from '../components/ChatApp';
import MessageSection from '../components/MessageSection';
import chatAppQueries from './chatApp';
import messageSectionQueries from './messageSection';

const NestedRootContainer = relayNestedRoutes(React, Relay);
// with relayNestedRoutes, we can define mutiple root queries
// for different component with our react-router <Route>
// As shown below, params: id being query variable: id in messageSectionQueries
// 利用 relayNestedRoutes, 下方的:id 就能在 messageSectionQueries 裡成為
// query 的variable: id, 這樣我們用本來習慣的react-router定義相對應的
// view 和 component, 只要再加 queries props 為不同 component 作 root queries即可

export default (
  <Route component={NestedRootContainer}>
    <Route path="/" component={ChatApp} queries={chatAppQueries}>
      <Route path="thread/:id" component={MessageSection}
        queries={messageSectionQueries} />
    </Route>
  </Route>
);
