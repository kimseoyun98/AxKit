import { Sec } from '../components/UI'

export function IconGallery() {
  return (
    <Sec id="icons">
      <h2>Icon Pack</h2>
      <p>
        기본 24px로 제공되며 비율을 유지하며 조정 가능합니다. 최소 크기는 12px, <strong>15px 이하</strong>에서는
        시각 복잡도를 줄이기 위해 Fill 사용을 권장합니다. 단독 버튼으로 쓸 때 터치 영역은 최소 40px 이상,
        24px 아이콘이라면 44px 이상 여백을 권장합니다.
        <br />
        <strong>Line</strong> — 더 디테일한 설명 가능, 명확한 시각적 개념 전달에 사용.
        <br />
        <strong>Fill</strong> — 인식 속도가 빠르고 형태가 단순해 알아보기 쉬움. On/Off 상태 전환 표현,
        16px 이하 작은 크기, 버튼/칩처럼 컨테이너 안에 배치될 때 권장.
      </p>

      <h3>Monochrome — @seed-design/icon</h3>
      <p>
        Regular/Fill/Thin 3가지 굵기, 총 588개. Public 폴더에 SVG로 받아 <code>{'<img src="/icons/icon_이름_굵기.svg" />'}</code>{' '}
        형태로 바로 사용합니다.
      </p>
      <pre style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '14px 16px', fontSize: 12, fontFamily: 'monospace', overflowX: 'auto' }}>
{`npm install @seed-design/icon

<img src="/icons/icon_home_fill.svg" width={24} height={24} alt="" />`}
      </pre>
    </Sec>
  )
}
