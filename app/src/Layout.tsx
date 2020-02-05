import React from "react";
import Scrollbar from "react-scrollbars-custom";

import { H3, Icon } from "@blueprintjs/core";

import { Logo } from "Icons/Logo";
import { router } from "Router";

export const AppContainer: React.FC = ({ children }) => {
  return (
    <div className="gsm-root bp3-dark">
      <div className="gsm-sidebar">
        <Sidebar />
      </div>
      <div className="gsm-content">
        <Scrollbar>
          <div className="gsm-inner-content">{children}</div>
        </Scrollbar>
      </div>
    </div>
  );
};

function Sidebar() {
  return (
    <div className="gsm-sidebar-inner">
      <div className="gsm-sidebar-header">
        <div className="gsm-logo bp3-text-muted">
          <Logo />
        </div>
        <div className="gsm-header">
          <H3>GSM</H3>
        </div>
      </div>
      <div className="gsm-sidebar-divider" />
      <div className="gsm-sidebar-button bp3-text-muted" onClick={() => router.goTo("/")}>
        <Icon icon="people" />
        <span className="menu-title">Adventurers</span>
      </div>
      <div className="gsm-sidebar-divider" />
    </div>
  );
}
