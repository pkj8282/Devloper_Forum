'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// 간단한 버튼 컴포넌트
const SimpleButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary';
  className?: string;
}> = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors duration-150'
  const variants = {
    primary: 'bg-[var(--brand-primary)] text-white hover:opacity-90',
    secondary: 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-light)] hover:bg-[var(--bg-tertiary)]'
  }
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// 간단한 카드 컴포넌트
const SimpleCard: React.FC<{ 
  title: string; 
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg p-6 mb-6 ${className}`}>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">{title}</h2>
      <div className="border-t border-[var(--border-default)] pt-4">
        {children}
      </div>
    </div>
  )
}

// 간단한 입력 컴포넌트
const SimpleInput: React.FC<{ 
  placeholder?: string; 
  type?: string;
  className?: string;
}> = ({ placeholder, type = 'text', className = '' }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--brand-primary)] focus:outline-none w-full ${className}`}
    />
  )
}

export default function ComponentsDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">UI 컴포넌트 데모</h1>
          <p className="text-[var(--text-secondary)] mb-6">
            Roblox Developer Forum 다크 테마를 기반으로 한 UI 컴포넌트들
          </p>
          <Link href="/">
            <SimpleButton variant="secondary">
              🏠 홈으로 돌아가기
            </SimpleButton>
          </Link>
        </div>

        {/* 버튼 데모 */}
        <SimpleCard title="버튼 컴포넌트">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <SimpleButton>Primary 버튼</SimpleButton>
              <SimpleButton variant="secondary">Secondary 버튼</SimpleButton>
              <SimpleButton onClick={() => setCount(count + 1)}>
                클릭 카운터: {count}
              </SimpleButton>
            </div>
          </div>
        </SimpleCard>

        {/* 입력 필드 데모 */}
        <SimpleCard title="입력 필드">
          <div className="space-y-4">
            <SimpleInput placeholder="이름을 입력하세요" />
            <SimpleInput type="email" placeholder="이메일을 입력하세요" />
            <SimpleInput type="password" placeholder="비밀번호를 입력하세요" />
          </div>
        </SimpleCard>

        {/* 색상 팔레트 */}
        <SimpleCard title="색상 팔레트">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-12 bg-[var(--brand-primary)] rounded"></div>
              <p className="text-sm">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-[var(--brand-secondary)] rounded"></div>
              <p className="text-sm">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-[var(--status-success)] rounded"></div>
              <p className="text-sm">Success</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-[var(--status-error)] rounded"></div>
              <p className="text-sm">Error</p>
            </div>
          </div>
        </SimpleCard>

        {/* 타이포그래피 */}
        <SimpleCard title="타이포그래피">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Heading 1</h1>
            <h2 className="text-2xl font-bold">Heading 2</h2>
            <h3 className="text-xl font-bold text-[var(--brand-secondary)]">Heading 3</h3>
            <p className="text-base">일반 텍스트입니다. 이것은 기본 폰트 크기와 색상을 보여줍니다.</p>
            <p className="text-[var(--text-secondary)]">보조 텍스트입니다.</p>
            <p className="text-[var(--text-tertiary)]">삼차 텍스트입니다.</p>
          </div>
        </SimpleCard>

        {/* 상태 표시 */}
        <SimpleCard title="상태 표시">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--status-success)] rounded-full"></div>
              <span>온라인</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--status-warning)] rounded-full"></div>
              <span>자리비움</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--status-error)] rounded-full"></div>
              <span>바쁨</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--text-muted)] rounded-full"></div>
              <span>오프라인</span>
            </div>
          </div>
        </SimpleCard>

        {/* 레이아웃 예시 */}
        <SimpleCard title="레이아웃 예시">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[var(--bg-surface)] p-4 rounded border border-[var(--border-light)]">
              <h4 className="font-semibold mb-2">카드 1</h4>
              <p className="text-[var(--text-secondary)] text-sm">
                이것은 첫 번째 카드입니다.
              </p>
            </div>
            <div className="bg-[var(--bg-surface)] p-4 rounded border border-[var(--border-light)]">
              <h4 className="font-semibold mb-2">카드 2</h4>
              <p className="text-[var(--text-secondary)] text-sm">
                이것은 두 번째 카드입니다.
              </p>
            </div>
            <div className="bg-[var(--bg-surface)] p-4 rounded border border-[var(--border-light)]">
              <h4 className="font-semibold mb-2">카드 3</h4>
              <p className="text-[var(--text-secondary)] text-sm">
                이것은 세 번째 카드입니다.
              </p>
            </div>
          </div>
        </SimpleCard>

        {/* 홈으로 돌아가기 버튼 (하단 고정) */}
        <div className="fixed bottom-6 right-6">
          <Link href="/">
            <SimpleButton className="shadow-lg">
              🏠 홈으로
            </SimpleButton>
          </Link>
        </div>
      </div>
    </div>
  )
}