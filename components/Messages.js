import React from 'react';
import { Button, message, Space } from 'antd';

const Messages = ({messageText,type}) => {

  const [messageApi, contextHolder] = message.useMessage();

  const handleMessage = () => {
    messageApi.open({
      type: type,
      content: messageText,
      duration: 10,
    });
  };

  React.useEffect(() => {
    
    return () => handleMessage();
  }, [])

  return (
    <>
      {contextHolder}
    </>
  );
};

export default Messages;