---
name: react-best-practice
description: Vercel의 React Best Practice에 따라 코드를 검토하고 작성합니다. React 컴포넌트, hooks, 성능 최적화, Next.js 패턴 등을 가이드합니다.
---

# React Best Practices (Vercel)

이 skill은 Vercel의 React Best Practice를 기반으로 코드를 검토하고 개선 방안을 제시합니다.

## 1. Component 설계

### Functional Components 사용
- Class components 대신 functional components 사용
- Props는 destructuring으로 받기
- 단일 책임 원칙(SRP) 준수

```tsx
// Good
function UserProfile({ name, email, avatar }: UserProfileProps) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// Bad
function UserProfile(props) {
  return <div>{props.name}</div>;
}
```

### Component 분리
- 재사용 가능한 단위로 분리
- Container/Presentational 패턴 고려
- 파일당 하나의 exported component 권장

## 2. Hooks 활용

### useState
- 관련된 상태는 객체로 그룹화
- 불필요한 상태 최소화 (derived state 피하기)

```tsx
// Good - derived state 계산
const [items, setItems] = useState<Item[]>([]);
const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

// Bad - 불필요한 상태
const [items, setItems] = useState<Item[]>([]);
const [totalPrice, setTotalPrice] = useState(0); // 동기화 문제 발생 가능
```

### useEffect
- 의존성 배열 완전하게 작성
- cleanup 함수로 메모리 누수 방지
- 여러 effect는 관심사별로 분리

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetchData(controller.signal);

  return () => controller.abort(); // cleanup
}, [dependency]);
```

### useCallback & useMemo
- 렌더링 최적화가 필요할 때만 사용
- 과도한 최적화 피하기

```tsx
// 자식 컴포넌트에 전달하는 함수
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// 비용이 큰 계산
const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]);
```

### Custom Hooks
- 로직 재사용을 위해 custom hooks 추출
- `use` prefix 사용
- 단일 책임 원칙 적용

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

## 3. 성능 최적화

### React.memo
- Props가 자주 변경되지 않는 컴포넌트에 적용
- 커스텀 비교 함수 필요시 제공

```tsx
const ExpensiveComponent = memo(function ExpensiveComponent({ data }: Props) {
  return <div>{/* 복잡한 렌더링 */}</div>;
});
```

### 코드 스플리팅
- React.lazy와 Suspense 활용
- 라우트 기반 스플리팅

```tsx
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
```

### 이미지 최적화 (Next.js)
- next/image 컴포넌트 사용
- 적절한 sizes 속성 지정

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // LCP 이미지에 사용
/>
```

## 4. 상태 관리

### 상태 위치 결정
- 가능한 가장 가까운 곳에 상태 배치
- Props drilling이 3단계 이상이면 Context 고려
- 서버 상태는 React Query/SWR 사용

```tsx
// 서버 상태 관리
const { data, isLoading, error } = useSWR('/api/user', fetcher);
```

### Context API
- 자주 변경되는 값은 Context 분리
- Provider 중첩 최소화

```tsx
// 분리된 Context
const ThemeContext = createContext<Theme>('light');
const UserContext = createContext<User | null>(null);
```

## 5. TypeScript

### Props 타입 정의
- interface 또는 type 사용
- children 타입 명시

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}
```

### Generic Components
```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}
```

### 타입 안전한 이벤트 핸들러
```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

## 6. Next.js App Router 패턴

### Server Components (기본값)
- 데이터 fetching은 서버 컴포넌트에서
- 'use client'는 필요한 곳에만

```tsx
// Server Component (기본)
async function PostList() {
  const posts = await getPosts(); // 서버에서 직접 fetch
  return <ul>{posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>;
}
```

### Client Components
```tsx
'use client';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Server Actions
```tsx
async function submitForm(formData: FormData) {
  'use server';
  const name = formData.get('name');
  await saveToDatabase({ name });
}
```

## 7. 접근성 (A11y)

- 시맨틱 HTML 사용
- ARIA 속성 적절히 사용
- 키보드 네비게이션 지원
- 색상 대비 확인

```tsx
<button
  aria-label="메뉴 닫기"
  aria-expanded={isOpen}
  onClick={onClose}
>
  <CloseIcon />
</button>
```

## 8. 에러 처리

### Error Boundary
```tsx
'use client';

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

### 에러 UI (Next.js)
```tsx
// error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>문제가 발생했습니다</h2>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}
```

## 검토 체크리스트

코드 검토 시 다음 항목을 확인합니다:

- [ ] Functional components 사용
- [ ] Props에 TypeScript 타입 정의
- [ ] useEffect 의존성 배열 완전성
- [ ] 불필요한 리렌더링 최적화
- [ ] 적절한 에러 처리
- [ ] 접근성 준수
- [ ] Server/Client Component 적절한 분리
- [ ] 코드 중복 최소화
- [ ] 명확한 네이밍
