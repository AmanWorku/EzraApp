import React, {forwardRef} from 'react';
import Toast from 'react-native-toast-message';

const ToastComponent = forwardRef((props, ref) => {
  return <Toast {...props} ref={ref} />;
});

export default ToastComponent;
