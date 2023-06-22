import React, { useState } from 'react';
import categories from './categories';
import EmojiCategory from './EmojiCategory';
import TabBar from './TabBar';

interface Tab {
  category: string;
  tabLabel: string;
}

interface EmojiPickerProps {
  messageObj: any;
  cursor: any;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ messageObj,cursor }) => {

  const [index, setIndex] = useState<number>(0);
  const [routes, setRoutes] = useState<{ key: string; title: string }[]>(
    categories.tabs.map((tab: Tab) => ({ key: tab.category, title: tab.tabLabel }))
  );

  return (
    <>
      <TabBar setIndex={setIndex} index={index} routes={routes} />
      <EmojiCategory category={routes[index]?.key} messageObj={messageObj} cursor={cursor} />
    </>
  );
};

export default EmojiPicker;
