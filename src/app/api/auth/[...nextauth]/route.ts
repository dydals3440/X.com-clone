// GET /api/auth
// import { GET, POST } from './route';
// Catch ALL Route기 떄문에 /api/auth/a/b/c 아무거나 다들어갈 수 있음.

// 프론트 백엔드 서버 나누면 좋은점
// 규모가 커지면 좋음.
// 백엔드 서버에만 요청이 많이 오고, 프론트 서버에는 요청이 별로 안온다.
// 이런 경우에는 백엔드 서버만 여러대 늘리면 됨.
// 프론트 서버에만 요청이 많이오고, 백엔드 서버는 하는일이 없다.
// 그럼 프론트 서버를 늘림.
// 같이 붙어놓으면, 서버를 모두 늘려줘야함 (프론트 && 백 서버)

// 여기서 쓰는 GET, POST는 auth.ts에서 가져옴
export { GET, POST } from '@/auth';
