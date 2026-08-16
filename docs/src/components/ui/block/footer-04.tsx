/**
 * @file block:footer-04
 * @requires @seed-design/react@^2.0.0
 * @requires @seed-design/css@^2.0.0
 **/

import type * as React from "react";
import { Box, Footer, HStack, Icon, Text, VStack } from "@seed-design/react";
import { ActionButton } from "../action-button";

import { IconFacebook } from "../icon/icon-facebook";
import { IconInstagram } from "../icon/icon-instagram";
import { IconYouTube } from "../icon/icon-youtube";

function DefaultBrandLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="24"
      viewBox="0 0 100 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="0"
        y="18"
        fill="var(--seed-color-fg-neutral)"
        fontSize="18"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.5px"
      >
        LOGO
      </text>
    </svg>
  );
}

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <VStack gap="x4" align="flex-start" style={{ minWidth: "100px" }}>
      <Text textStyle="t3Medium" color="fg.neutralMuted">
        {title}
      </Text>
      <VStack gap="x4" align="flex-start">
        {links.map((link) => (
          <Footer.LinkText key={link.label} size="large" href={link.href}>
            {link.label}
          </Footer.LinkText>
        ))}
      </VStack>
    </VStack>
  );
}

const COUNTRY_LINKS = [
  { label: "Canada", href: "#" },
  { label: "United States", href: "#" },
  { label: "United Kingdom", href: "#" },
  { label: "日本", href: "#" },
];

const LINK_COLUMNS = [
  {
    title: "서비스",
    links: [
      { label: "서비스 소개", href: "#" },
      { label: "간편결제", href: "#" },
      { label: "플랫폼 카테고리", href: "#" },
      { label: "비즈니스 센터", href: "#" },
      { label: "블로그", href: "#" },
      { label: "채용 안내", href: "#" },
    ],
  },
  {
    title: "비즈니스",
    links: [
      { label: "비즈니스 센터", href: "#" },
      { label: "기업 제휴 문의", href: "#" },
      { label: "광고/마케팅 문의", href: "#" },
      { label: "파트너스 플랫폼", href: "#" },
    ],
  },
  {
    title: "고객 지원",
    links: [
      { label: "고객센터 / FAQ", href: "#" },
      { label: "1:1 문의하기", href: "#" },
      { label: "IR 공시", href: "#" },
      { label: "PR 뉴스룸", href: "#" },
    ],
  },
];

export default function FooterBlock() {
  return (
    <Box
      as="footer"
      width="100%"
      style={{ maxWidth: "1040px", marginInline: "auto" }}
      paddingX="x8"
      paddingY="x10"
    >
      <VStack gap="x10" align="flex-start">
        {/* Upper: Logo + Country Links + Link Columns */}
        <HStack gap="x8" align="flex-start" width="100%" wrap>
          {/* Logo + Country Links */}
          <VStack gap="x4" align="flex-start" style={{ flex: 1, minWidth: "120px" }}>
            <DefaultBrandLogo />
            <VStack gap="x3" align="flex-start">
              {COUNTRY_LINKS.map((link) => (
                <Footer.LinkText key={link.label} size="medium" href={link.href}>
                  {link.label}
                </Footer.LinkText>
              ))}
            </VStack>
          </VStack>

          {/* Link Columns Grid */}
          <HStack gap="x8" wrap align="flex-start">
            {LINK_COLUMNS.map((column) => (
              <LinkColumn key={column.title} title={column.title} links={column.links} />
            ))}
          </HStack>
        </HStack>

        {/* Divider */}
        <Box
          width="100%"
          style={{ height: "1px", backgroundColor: "var(--seed-v3-color-stroke-neutral)" }}
        />

        {/* Lower: Links + Company Info + Copyright + SNS */}
        <VStack gap="x4" align="flex-start" width="100%">
          <HStack gap="x6" wrap align="center">
            <Footer.LinkText size="medium" href="#">
              개인정보처리방침
            </Footer.LinkText>
            <Footer.LinkText size="medium" href="#">
              이용약관
            </Footer.LinkText>
            <Footer.LinkText size="medium" href="#">
              운영정책
            </Footer.LinkText>
            <Footer.LinkText size="medium" href="#">
              위치기반서비스 이용약관
            </Footer.LinkText>
            <Footer.LinkText size="medium" href="#">
              이용자보호 비전과 계획
            </Footer.LinkText>
            <Footer.LinkText size="medium" href="#">
              청소년보호정책
            </Footer.LinkText>
          </HStack>

          <Text textStyle="t3Regular" color="fg.neutralSubtle">
            (주)에이비씨컴퍼니 | 사업자 등록번호: 000-00-00000 | 통신판매업신고번호: 0000-서울강남-0000 |
            대표: 홍길동 | 주소: 서울특별시 강남구 테헤란로 123
            <br />
            호스팅 사업자: Amazon Web Service(AWS)
          </Text>

          <Text textStyle="t3Regular" color="fg.neutralSubtle">
            전화: 000-0000-0000 | 고객문의: support@example.com
          </Text>

          <HStack justify="space-between" align="center" width="100%" wrap gap="x4">
            <Text textStyle="t4Medium" color="fg.neutralMuted">
              ⓒ 2026 Company Inc.
            </Text>

            <HStack gap="x6">
              <ActionButton
                variant="ghost"
                size="large"
                layout="iconOnly"
                bleedX="asPadding"
                aria-label="Facebook"
              >
                <Icon svg={<IconFacebook />} />
              </ActionButton>
              <ActionButton
                variant="ghost"
                size="large"
                layout="iconOnly"
                bleedX="asPadding"
                aria-label="YouTube"
              >
                <Icon svg={<IconYouTube />} />
              </ActionButton>
              <ActionButton
                variant="ghost"
                size="large"
                layout="iconOnly"
                bleedX="asPadding"
                aria-label="Instagram"
              >
                <Icon svg={<IconInstagram />} />
              </ActionButton>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}

/**
 * This file is a snippet from SEED Design, helping you get started quickly with @seed-design/* packages.
 * You can extend this snippet however you want.
 */
