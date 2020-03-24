import * as React from 'react';

export interface DrawerPropTypes {
  children: React.FunctionComponent | React.ComponentClass;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: () => void;
  sidebar?: React.ReactNode;
  expandedSettings?: string;
}

declare const Drawer: React.FunctionComponent<DrawerPropTypes>;

export default Drawer;
