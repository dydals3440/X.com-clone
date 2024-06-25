// next에서는 서버에서도 돌고, 클라이언트에서도 mock-service가 돌아야하기 떄문에 매우 애매.
// 브라우저가 있으면 서버쪽도 있어야 한다.
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers.
const worker = setupWorker(...handlers);

export default worker;
