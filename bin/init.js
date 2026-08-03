#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

// ── ANSI 색상 ──────────────────────────────────────────────
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  blue:   '\x1b[34m',
  cyan:   '\x1b[36m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  gray:   '\x1b[90m',
};
const b = (s) => `${c.bold}${s}${c.reset}`;
const g = (s) => `${c.green}${s}${c.reset}`;
const bl = (s) => `${c.blue}${s}${c.reset}`;
const y = (s) => `${c.yellow}${s}${c.reset}`;
const dim = (s) => `${c.dim}${s}${c.reset}`;

// ── 프롬프트 유틸 ──────────────────────────────────────────
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

// ── 헥스 검증 ──────────────────────────────────────────────
const isHex = (v) => /^#[0-9A-Fa-f]{6}$/.test(v.trim());

// ── 메인 ──────────────────────────────────────────────────
async function main() {
  console.log();
  console.log(`${c.bold}${c.blue}  ██████╗ ██╗  ██╗██████╗ ██╗   ██╗██████╗ ██╗     ██╗███████╗██╗  ██╗${c.reset}`);
  console.log(`${c.bold}${c.blue}  ██╔══██╗╚██╗██╔╝██╔══██╗██║   ██║██╔══██╗██║     ██║██╔════╝██║  ██║${c.reset}`);
  console.log(`${c.bold}${c.blue}  ███████║ ╚███╔╝ ██████╔╝██║   ██║██████╔╝██║     ██║███████╗███████║${c.reset}`);
  console.log(`${c.bold}${c.blue}  ██╔══██║ ██╔██╗ ██╔═══╝ ██║   ██║██╔══██╗██║     ██║╚════██║██╔══██║${c.reset}`);
  console.log(`${c.bold}${c.blue}  ██║  ██║██╔╝ ██╗██║     ╚██████╔╝██████╔╝███████╗██║███████║██║  ██║${c.reset}`);
  console.log(`${c.bold}${c.blue}  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═════╝ ╚══════╝╚═╝╚══════╝╚═╝  ╚═╝${c.reset}`);
  console.log();
  console.log(`  ${b('AI Design-to-Code Pipeline')}  ${dim('v1.0.0')}`);
  console.log(`  ${dim('Figma MCP + Seed Design + Tailwind CSS')}`);
  console.log();
  console.log(`  ─────────────────────────────────────────────`);
  console.log();

  // ── 프로젝트 정보 수집 ────────────────────────────────────
  const name = (await ask(`  ${bl('?')} 프로젝트명 ${dim('(영문, 폴더명으로 사용됩니다)')} › `)).trim() || 'my-project';
  const figmaUrl = (await ask(`  ${bl('?')} Figma 파일 URL ${dim('(https://figma.com/design/...)')} › `)).trim();

  let primary = '';
  while (!isHex(primary)) {
    primary = (await ask(`  ${bl('?')} Primary 컬러 ${dim('(hex, 예: #0066FF)')} › `)).trim();
    if (!isHex(primary)) console.log(`     ${c.red}✗ 올바른 hex 형식이 아닙니다. 예: #0066FF${c.reset}`);
  }

  let secondary = (await ask(`  ${bl('?')} Secondary 컬러 ${dim('(없으면 Enter 건너뜀)')} › `)).trim();
  if (secondary && !isHex(secondary)) secondary = '없음';
  if (!secondary) secondary = '없음';

  const screensRaw = (await ask(`  ${bl('?')} 빌드할 화면 목록 ${dim('(쉼표 구분, 예: 홈, 서비스, 팀)')} › `)).trim();
  const screens = screensRaw || '홈';

  rl.close();

  console.log();
  console.log(`  ─────────────────────────────────────────────`);
  console.log(`  ${g('✔')} 프로젝트 정보 수집 완료`);
  console.log();

  // ── 출력 폴더 생성 ────────────────────────────────────────
  const outDir = path.resolve(process.cwd(), name);
  if (fs.existsSync(outDir)) {
    console.log(`  ${y('⚠')}  ${b(name)} 폴더가 이미 존재합니다. 파일을 덮어씁니다.`);
  } else {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // ── 템플릿 파일 복사 ──────────────────────────────────────
  const templatesDir = path.join(__dirname, '..', 'templates');
  const templateFiles = [
    'axpublish-orchestrator.md',
    'responsive-rules.md',
    'tokens.css',
    'generate-theme.js',
    'figma-semantic-variables.json',
  ];

  console.log(`  ${b('파일 생성 중...')}`);
  for (const file of templateFiles) {
    const src = path.join(templatesDir, file);
    const dest = path.join(outDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`  ${g('✔')} ${file}`);
    } else {
      console.log(`  ${y('⚠')} ${file} ${dim('(템플릿 없음 — 건너뜀)')}`);
    }
  }

  // ── PROMPT.md 생성 (값 채워서) ────────────────────────────
  const screenList = screens.split(',').map(s => s.trim()).join(' / ');
  const promptContent = generatePrompt({ name, figmaUrl, primary, secondary, screens: screenList });
  fs.writeFileSync(path.join(outDir, 'PROMPT.md'), promptContent, 'utf-8');
  console.log(`  ${g('✔')} PROMPT.md ${dim('(프로젝트 정보 자동 입력됨)')}`);

  // ── 완료 메시지 ───────────────────────────────────────────
  console.log();
  console.log(`  ─────────────────────────────────────────────`);
  console.log();
  console.log(`  ${g('🎉 axpublish 초기화 완료!')}`);
  console.log();
  console.log(`  생성된 폴더: ${b(name)}/`);
  console.log(`  ${dim('├── PROMPT.md               ← Claude에 붙여넣을 시작 프롬프트')}`);
  console.log(`  ${dim('├── axpublish-orchestrator.md')}`);
  console.log(`  ${dim('├── responsive-rules.md')}`);
  console.log(`  ${dim('├── tokens.css               ← Tailwind v4 네이티브 (tailwind.config.js 없음)')}`);
  console.log(`  ${dim('├── generate-theme.js')}`);
  console.log(`  ${dim('└── figma-semantic-variables.json')}`);
  console.log();
  console.log(`  ${b('다음 단계:')}`);
  console.log(`  ${dim('1.')} Claude에 Figma MCP 연결`);
  console.log(`  ${dim('2.')} ${b(name)}/ 폴더의 파일 7개를 Claude에 첨부`);
  console.log(`  ${dim('3.')} ${b('PROMPT.md')} 내용을 복사해 첫 메시지로 전송`);
  console.log();
  console.log(`  ${dim('─────────────────────────────────────────────')}`);
  console.log();
}

// ── PROMPT.md 생성 함수 ───────────────────────────────────
function generatePrompt({ name, figmaUrl, primary, secondary, screens }) {
  return `당신은 **axpublish 디자인-to-코드 파이프라인 에이전트**입니다.

아래 첨부된 파일들이 이 작업의 전체 시스템입니다.
시작 전 반드시 모두 읽고 숙지하세요:

- \`axpublish-orchestrator.md\` — 워크플로우 지침서. **이 파일이 모든 행동의 최우선 기준입니다.**
- \`responsive-rules.md\` — 반응형 변환 규칙. 코드 생성 시 항상 이 문서를 기준으로 합니다.
- \`tokens.css\` — Seed Design 시맨틱 토큰 전체 (Tailwind v4 네이티브, tailwind.config.js 없음). 하드코딩 금지, 이 파일의 변수만 사용합니다.
- \`generate-theme.js\` — Primary/Secondary hex를 받아 theme.css를 생성하는 스크립트.
- \`figma-semantic-variables.json\` — Figma Variable Collection 생성 템플릿 (52개).

---

## 절대 원칙 (항상 유지)

1. **순서 고수** — Phase 0 → 1 → 2 → 3 → 4 → 5 → 6. 이전 Phase 완료 전 절대 다음으로 넘어가지 않음.
2. **선보고 후실행** — 각 Phase/Step 시작 시 선언. 완료 시 요약 보고 후 다음 진행.
3. **하드코딩 금지** — tokens.css / theme.css에 정의된 CSS 변수 외의 값은 코드에 절대 직접 삽입하지 않음. (tailwind.config.js 없음 — v4 CSS 네이티브)
4. **임의 판단 금지** — responsive-rules.md의 PAUSE 트리거 상황에서 독자 결론 없이 반드시 옵션 제시.
5. **화면 단위 진행** — 한 화면 완전히 완료 + 디자이너 승인 후 다음 화면. 전체 일괄 빌드 절대 금지.
6. **Code Generation은 Figma 확정 이후에만** — Phase 0-F (Figma 확정 게이트) 통과 전까지 코드 생성 시작하지 않음.
7. **컴포넌트 재사용** — 버튼, GNB, 인풋 등은 Phase 3에서 한 번만 만들고, 이후 모든 화면에서 가져다 씀.

---

## 프로젝트 정보

- **프로젝트명**: ${name}
- **Figma 파일**: ${figmaUrl || '[FIGMA_URL — Figma에서 공유 링크 복사해서 입력]'}
- **Primary 컬러**: ${primary}
- **Secondary 컬러**: ${secondary}
- **빌드 화면 목록**: ${screens}

---

## 시작

\`axpublish-orchestrator.md\`를 읽고 **Phase 0-B부터 순서대로** 실행해주세요.

위 프로젝트 정보에 이미 Primary/Secondary 컬러가 제공되었으므로,
Phase 0-A의 컬러 수집 질문은 건너뛰고
**바로 Phase 0-B (theme.css 생성)부터** 시작하세요.
`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
