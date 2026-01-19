export const COLOR_PALETTE = [
  { name: '빨강', value: '#ff6b6b' },
  { name: '코랄', value: '#ff8787' },
  { name: '오렌지', value: '#ffa94d' },
  { name: '노랑', value: '#ffd43b' },
  { name: '라임', value: '#a9e34b' },
  { name: '초록', value: '#69db7c' },
  { name: '청록', value: '#38d9a9' },
  { name: '민트', value: '#3bc9db' },
  { name: '하늘', value: '#4dabf7' },
  { name: '파랑', value: '#748ffc' },
  { name: '보라', value: '#9775fa' },
  { name: '핑크', value: '#f783ac' },
] as const;

export const DEFAULT_COLOR: string = COLOR_PALETTE[0].value;
