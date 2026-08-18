import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable } from '../components/UI'

const relativeTimeRows = [
  { label: '매우 짧은 시간', ko: '방금 전', en: 'Just now', ja: 'たった今' },
  { label: '초, 단수', ko: '1초 전', en: '1s', ja: '1 秒前' },
  { label: '초, 복수', ko: '2초 전', en: '2s', ja: '2 秒前' },
  { label: '분, 단수', ko: '1분 전', en: '1min', ja: '1 分前' },
  { label: '분, 복수', ko: '2분 전', en: '2min', ja: '2 分前' },
  { label: '시간, 단수', ko: '1시간 전', en: '1h', ja: '1 時間前' },
  { label: '시간, 복수', ko: '2시간 전', en: '2h', ja: '2 時間前' },
  { label: '일, 단수', ko: '1일 전', en: '1d', ja: '1 日前' },
  { label: '일, 복수', ko: '2일 전', en: '2d', ja: '2 日前' },
  { label: '주, 단수', ko: '1주 전', en: '1w', ja: '1 週間前' },
  { label: '주, 복수', ko: '2주 전', en: '2w', ja: '2 週間前' },
  { label: '월, 단수', ko: '1달 전', en: '1mo', ja: '1 か月前' },
  { label: '월, 복수', ko: '2달 전', en: '2mo', ja: '2 か月前' },
  { label: '년, 단수', ko: '1년 전', en: '1y', ja: '1 年前' },
  { label: '년, 복수', ko: '2년 전', en: '2y', ja: '2 年前' },
]

const dateFormatRows = [
  { locale: 'ko_KR', standard: '2015년 7월 16일', compact: '7월 16일', dot: '2015. 7. 16.' },
  { locale: 'en_GB', standard: '16 Jul 2015', compact: '16 Jul', dot: '—' },
  { locale: 'en_CA', standard: 'Jul 16, 2015', compact: 'Jul 16', dot: '—' },
  { locale: 'en_US', standard: 'Jul 16, 2015', compact: 'Jul 16', dot: '—' },
  { locale: 'ja_JP', standard: '2015 年 7 月 16 日', compact: '7 月 16 日', dot: '—' },
]

const weekdayTimeRows = [
  { locale: 'ko_KR', withTime: '7월 16일 (수) 오후 9:41', weekdayOnly: '7월 16일 수요일' },
  { locale: 'en_GB', withTime: 'Wed 16 Jul at 9:41 PM', weekdayOnly: 'Wed 16 Jul' },
  { locale: 'en_CA', withTime: 'Wed, Jul 16 at 9:41 PM', weekdayOnly: 'Wed, Jul 16' },
  { locale: 'en_US', withTime: 'Wed, Jul 16 at 9:41 PM', weekdayOnly: 'Wed, Jul 16' },
  { locale: 'ja_JP', withTime: '7 月 16 日(水) 21:41', weekdayOnly: '7 月 16 日(水)' },
]

const counterRows = [
  { locale: 'ko_KR', views: '조회수 3만', reviewSingular: '후기 1개', reviewPlural: '후기 3개' },
  { locale: 'en_GB', views: '30K views', reviewSingular: '1 review', reviewPlural: '3 reviews' },
  { locale: 'en_CA', views: '30K views', reviewSingular: '1 review', reviewPlural: '3 reviews' },
  { locale: 'en_US', views: '30K views', reviewSingular: '1 review', reviewPlural: '3 reviews' },
  { locale: 'ja_JP', views: '閲覧数 3 万', reviewSingular: 'レビュー 1 件', reviewPlural: 'レビュー 3 件' },
]

const bigNumberRows = [
  { n: '123', ko: '123', enCA: '123', enGB: '123', enUS: '123', ja: '123' },
  { n: '1,230', ko: '1.23천', enCA: '1.23K', enGB: '1.23K', enUS: '1.23K', ja: '1,230' },
  { n: '12,300', ko: '1.23만', enCA: '12.3K', enGB: '12.3K', enUS: '12.3K', ja: '1.23 万' },
  { n: '123,000', ko: '12.3만', enCA: '123K', enGB: '123K', enUS: '123K', ja: '12.3 万' },
  { n: '1,230,000', ko: '123만', enCA: '1.23M', enGB: '12.3M', enUS: '1.23M', ja: '123 万' },
  { n: '12,300,000', ko: '1,230만', enCA: '12.3M', enGB: '12.3M', enUS: '12.3M', ja: '1,230 万' },
  { n: '123,000,000', ko: '1.23억', enCA: '123M', enGB: '123M', enUS: '123M', ja: '123 億' },
]

const otherFormatRows = [
  { locale: 'ko_KR', distance: 'km', currency: '1,234,567원', phone: '010-XXXX-XXXX', quote: "'abc'" },
  { locale: 'en_CA', distance: 'km', currency: '$12,345.67', phone: '(AAA) XXX-XXXX', quote: '"abc"' },
  { locale: 'en_GB', distance: 'mi', currency: '£12,345.67', phone: '07XXX XXXXXX', quote: "'abc'" },
  { locale: 'en_US', distance: 'mi', currency: '$12,345.67', phone: '(AAA) XXX-XXXX', quote: '"abc"' },
  { locale: 'ja_JP', distance: 'km', currency: '1,234,567 円', phone: '0A0-XXXX-XXXX', quote: '「abc」' },
]

const expansionRows = [
  { len: '10자 이하', ratio: '150% - 250%' },
  { len: '11 - 20자', ratio: '130% - 150%' },
  { len: '21 - 30자', ratio: '110% - 130%' },
  { len: '31 - 50자', ratio: '90% - 110%' },
  { len: '51 - 70자', ratio: '80% - 90%' },
  { len: '71자 이상', ratio: '80%' },
]

export function I18nSection() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'f-international' || targetEl.closest('#f-international'))) {
            setExpanded(true);
          }
        } catch (e) {}
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  return (
    <Sec id="f-international">
      <h2
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          userSelect: 'none',
        }}
      >
        <span>International Design</span>
        
        <IconChevronDownLine
          style={{
            width: 16,
            height: 16,
            color: 'var(--seed-color-fg-neutral-subtle, #94A3B8)',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0,
          }}
        />
      </h2>
      <p>
        국제화는 단순 번역을 넘어, 톤·용어·표현이 언어별로 일관되게 전달되어 브랜드 아이덴티티와
        사용자 경험이 유지되도록 하는 작업입니다.
      </p>
      {expanded && (
        <div style={{ marginTop: 16 }}>

      <h3>상대적 시간 표기</h3>
      <TokenTable>
        <thead><tr><th>기준</th><th>ko_KR</th><th>en (CA/US/GB)</th><th>ja_JP</th></tr></thead>
        <tbody>
          {relativeTimeRows.map(r => (
            <tr key={r.label}><td>{r.label}</td><td>{r.ko}</td><td>{r.en}</td><td>{r.ja}</td></tr>
          ))}
        </tbody>
      </TokenTable>
      <p>'분' 단위는 'min'으로 명확히 표기합니다.</p>

      <h3>날짜 표기</h3>
      <TokenTable>
        <thead><tr><th>Locale</th><th>Standard</th><th>Compact</th><th>점(.) 축약</th></tr></thead>
        <tbody>
          {dateFormatRows.map(r => (
            <tr key={r.locale}><td>{r.locale}</td><td>{r.standard}</td><td>{r.compact}</td><td>{r.dot}</td></tr>
          ))}
        </tbody>
      </TokenTable>
      <p>
        한국어 점(.) 축약은 연·월·일 각각을 대신하므로 마지막 [일] 뒤에도 점을 찍습니다 (예: 2026. 3. 31.).
        전달 가능한 로케일 ID가 아니라 ko_KR 날짜의 표기 변형일 뿐입니다.
      </p>

      <h3>요일 및 시간 포함 날짜 표기</h3>
      <TokenTable>
        <thead><tr><th>Locale</th><th>요일+시간 포함</th><th>요일만 포함</th></tr></thead>
        <tbody>
          {weekdayTimeRows.map(r => (
            <tr key={r.locale}><td>{r.locale}</td><td>{r.withTime}</td><td>{r.weekdayOnly}</td></tr>
          ))}
        </tbody>
      </TokenTable>

      <h3>숫자와 단위의 순서</h3>
      <TokenTable>
        <thead><tr><th>Locale</th><th>조회수</th><th>후기(단수)</th><th>후기(복수)</th></tr></thead>
        <tbody>
          {counterRows.map(r => (
            <tr key={r.locale}><td>{r.locale}</td><td>{r.views}</td><td>{r.reviewSingular}</td><td>{r.reviewPlural}</td></tr>
          ))}
        </tbody>
      </TokenTable>

      <h3>큰 수 표기 방식</h3>
      <p>한국어는 만(10,000) 단위, 영어는 천(1,000) 단위로 숫자를 셉니다. 일본어는 千 단위를 소수점과 함께 쓰지 않습니다.</p>
      <TokenTable>
        <thead><tr><th>Number</th><th>ko_KR</th><th>en_CA</th><th>en_GB</th><th>en_US</th><th>ja_JP</th></tr></thead>
        <tbody>
          {bigNumberRows.map(r => (
            <tr key={r.n}><td>{r.n}</td><td>{r.ko}</td><td>{r.enCA}</td><td>{r.enGB}</td><td>{r.enUS}</td><td>{r.ja}</td></tr>
          ))}
        </tbody>
      </TokenTable>

      <h3>거리 / 통화 / 전화번호 / 강조 표기</h3>
      <TokenTable>
        <thead><tr><th>Locale</th><th>거리</th><th>통화</th><th>전화번호</th><th>강조</th></tr></thead>
        <tbody>
          {otherFormatRows.map(r => (
            <tr key={r.locale}><td>{r.locale}</td><td>{r.distance}</td><td>{r.currency}</td><td>{r.phone}</td><td>{r.quote}</td></tr>
          ))}
        </tbody>
      </TokenTable>

      <h3>구간 표기 / 괄호 사용</h3>
      <p>
        한국어는 구간에 물결표(~)를 쓰지만 영미권은 En Dash(–)를 씁니다. SEED 기준을 따라{' '}
        <strong>이롬넷에서도 지역/언어와 무관하게 Hyphen(-)으로 통일</strong>합니다. 괄호는 한국어·일본어의 ( )는 동일하게 쓰지만, 영어는
        괄호 앞에 반드시 띄어쓰기를 포함하고, 일본어 「 」는 ( )와 다른 용도(단어 강조·인용)로 씁니다.
      </p>

      <h3>번역 후 텍스트 확장 비율</h3>
      <p>한국어 원문 글자수 대비 번역 시 예상되는 UI 공간 확장 비율입니다.</p>
      <TokenTable>
        <thead><tr><th>한국어 원문 글자수</th><th>번역 시 확장 공간</th></tr></thead>
        <tbody>
          {expansionRows.map(r => (
            <tr key={r.len}><td>{r.len}</td><td>{r.ratio}</td></tr>
          ))}
        </tbody>
      </TokenTable>
      <p>버튼/레이블 등 폭 고정 요소는 긴 번역문 삽입을 고려해 여유 공간과 줄바꿈(wrap) 처리를 미리 확보해야 합니다.</p>
    
        </div>
      )}
</Sec>
  )
}
