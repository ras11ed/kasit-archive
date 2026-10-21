'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PerfectFocusKasitArchivePage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [roleTab, setRoleTab] = useState<'faculty' | 'user'>('faculty');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isRtl = lang === 'ar';
  const isDark = theme === 'dark';

  const styleConfig = {
    overlayBg: isDark 
      ? 'linear-gradient(135deg, rgba(2, 6, 23, 0.88) 0%, rgba(15, 23, 42, 0.82) 100%)' 
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.68) 0%, rgba(239, 246, 255, 0.58) 100%)',
    cardBg: isDark 
      ? 'rgba(15, 23, 42, 0.78)' 
      : 'rgba(255, 255, 255, 0.85)',
    cardBorder: isDark
      ? '1px solid rgba(255, 255, 255, 0.12)'
      : '1px solid rgba(255, 255, 255, 0.9)',
    textPrimary: isDark ? '#f8fafc' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#475569',
    primaryBlue: '#2563eb',
    inputBg: isDark ? 'rgba(2, 6, 23, 0.7)' : '#f8fafc',
    inputBorder: isDark ? '#334155' : '#cbd5e1',
    shadow: isDark
      ? '0 20px 40px rgba(0, 0, 0, 0.6)'
      : '0 15px 35px rgba(37, 99, 235, 0.08)'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. التحقق من البريد الجامعي الرسمي @ju.edu.jo
    const juEmailRegex = /^[a-zA-Z0-9._%+-]+@ju\.edu\.jo$/i;
    if (!juEmailRegex.test(email.trim())) {
      setErrorMessage(isRtl ? 'عذراً، يجب استخدام البريد الجامعي الرسمي (@ju.edu.jo)' : 'Error: Must use formal @ju.edu.jo email');
      return;
    }

    // 2. التحقق من دور المستخدم (Admin vs User)
    const isAdmin = email.toLowerCase().includes('admin') || roleTab === 'faculty';
    
    localStorage.setItem('authToken', 'kasit-user-token');
    localStorage.setItem('userEmail', email.trim().toLowerCase());
    localStorage.setItem('userRole', isAdmin ? 'admin' : 'user');

    // 3. التوجيه الذكي
    if (isAdmin) {
      window.location.href = '/admin';
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div style={{
      height: '100vh',
      maxHeight: '100vh',
      color: styleConfig.textPrimary,
      fontFamily: isRtl ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif",
      direction: isRtl ? 'rtl' : 'ltr',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
        
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          height: 100%;
        }

        input::placeholder {
          color: ${isDark ? '#64748b' : '#94a3b8'} !important;
        }

        input:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25) !important;
          background-color: ${isDark ? 'rgba(15, 23, 42, 0.9)' : '#ffffff'} !important;
        }
      `}</style>

      {/* خلفية المبنى */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(/kasit-bg.jpg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        filter: isDark ? 'brightness(0.55) contrast(1.15)' : 'brightness(1) contrast(1)',
        zIndex: 1,
        transition: 'all 0.3s ease'
      }} />

      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: styleConfig.overlayBg,
        backdropFilter: 'blur(2px)',
        zIndex: 2,
        transition: 'all 0.3s ease'
      }} />

      {/* الشريط العلوي */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        padding: '12px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: styleConfig.cardBg,
        backdropFilter: 'blur(16px)',
        borderBottom: styleConfig.cardBorder,
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1', padding: '3px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}>
            <img src="/uj-logo.png.jfif" alt="UJ" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <span style={{ fontSize: '16px', fontWeight: '800', color: styleConfig.textPrimary, display: 'block', letterSpacing: '-0.3px' }}>
              KASIT ARCHIVE
            </span>
            <span style={{ fontSize: '11px', color: styleConfig.primaryBlue, fontWeight: '700' }}>
              {isRtl ? 'الجامعة الأردنية' : 'The University of Jordan'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            style={{
              padding: '6px 12px', borderRadius: '8px',
              backgroundColor: styleConfig.inputBg,
              border: `1px solid ${styleConfig.inputBorder}`, 
              color: styleConfig.textPrimary,
              fontSize: '12px', fontWeight: '700', cursor: 'pointer'
            }}
          >
            <span>{isDark ? (isRtl ? 'فاتح' : 'Light') : (isRtl ? 'داكن' : 'Dark')}</span>
          </button>

          <button 
            onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
            style={{
              padding: '6px 14px', borderRadius: '8px',
              backgroundColor: styleConfig.inputBg,
              border: `1px solid ${styleConfig.inputBorder}`, 
              color: styleConfig.textPrimary,
              fontSize: '12px', fontWeight: '700', cursor: 'pointer'
            }}
          >
            {isRtl ? 'English' : 'العربية'}
          </button>
        </div>
      </header>

      {/* الجسم الرئيسي */}
      <main style={{
        position: 'relative',
        zIndex: 10,
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 390px',
        alignItems: 'center',
        padding: '0 60px',
        gap: '48px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%'
      }}>
        
        <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px',
            borderRadius: '20px', 
            backgroundColor: isDark ? 'rgba(37, 99, 235, 0.25)' : '#dbeafe',
            border: isDark ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid #bfdbfe', 
            marginBottom: '16px',
            fontSize: '12px', color: isDark ? '#60a5fa' : styleConfig.primaryBlue, fontWeight: '800'
          }}>
            {isRtl ? 'كلية الملك عبدالله الثاني لتكنولوجيا المعلومات' : 'King Abdullah II School of Information Technology'}
          </div>

          <h1 style={{
            fontSize: '54px', fontWeight: '900', color: styleConfig.textPrimary, margin: '0 0 14px 0',
            lineHeight: '1.05', letterSpacing: '-1.5px',
            textShadow: isDark ? '0 4px 16px rgba(0,0,0,0.8)' : '0 2px 8px rgba(255,255,255,0.9)'
          }}>
            KASIT <span style={{ color: styleConfig.primaryBlue }}>ARCHIVE</span>
          </h1>

          <p style={{
            fontSize: '15px', color: styleConfig.textSecondary,
            lineHeight: '1.6', maxWidth: '520px', fontWeight: '600', margin: 0
          }}>
            {isRtl 
              ? 'المنصة المؤسسية الموحدة للأرشيف الأكاديمي وضمان الجودة، لإدارة الاعتمادات والوثائق الجامعية.' 
              : 'Unified institutional academic archiving and quality assurance platform for KASIT accreditation and documentation.'}
          </p>
        </div>

        {/* نموذج تسجيل الدخول */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{
            width: '100%',
            backgroundColor: styleConfig.cardBg,
            border: styleConfig.cardBorder,
            borderRadius: '20px',
            padding: '20px 24px',
            backdropFilter: 'blur(20px)',
            boxShadow: styleConfig.shadow,
            transition: 'all 0.3s ease'
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <img src="/uj-logo.png.jfif" alt="UJ" style={{ width: '40px', marginBottom: '4px' }} />
              <h2 style={{ fontSize: '15px', fontWeight: '800', color: styleConfig.textPrimary, margin: 0 }}>
                {isRtl ? 'بوابة تسجيل الدخول الموحدة' : 'Portal Login'}
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', backgroundColor: isDark ? 'rgba(2, 6, 23, 0.6)' : '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
              <button 
                onClick={() => setRoleTab('faculty')}
                style={{
                  flex: 1, padding: '6px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', border: 'none',
                  backgroundColor: roleTab === 'faculty' ? styleConfig.primaryBlue : 'transparent',
                  color: roleTab === 'faculty' ? '#fff' : styleConfig.textSecondary,
                  transition: 'all 0.2s ease'
                }}
              >
                {isRtl ? 'هيئة التدريس / الإدارة' : 'Faculty / Admin'}
              </button>
              <button 
                onClick={() => setRoleTab('user')}
                style={{
                  flex: 1, padding: '6px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', border: 'none',
                  backgroundColor: roleTab === 'user' ? styleConfig.primaryBlue : 'transparent',
                  color: roleTab === 'user' ? '#fff' : styleConfig.textSecondary,
                  transition: 'all 0.2s ease'
                }}
              >
                {isRtl ? 'مستخدم عادي' : 'user'}
              </button>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {errorMessage && (
                <div style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid #ef4444',
                  color: '#fca5a5',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '700',
                  textAlign: 'center'
                }}>
                  ⚠️ {errorMessage}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: styleConfig.textSecondary, marginBottom: '3px' }}>
                  {isRtl ? 'البريد الإلكتروني الجامعي الرسمي (@ju.edu.jo)' : 'Official Email (@ju.edu.jo)'}
                </label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m.khawatreh@ju.edu.jo" 
                  style={{
                    width: '100%', padding: '9px 12px', borderRadius: '8px', backgroundColor: styleConfig.inputBg,
                    border: `1px solid ${styleConfig.inputBorder}`, color: styleConfig.textPrimary, fontSize: '13px', outline: 'none', fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: styleConfig.textSecondary, marginBottom: '3px' }}>
                  {isRtl ? 'كلمة السر' : 'Password'}
                </label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  style={{
                    width: '100%', padding: '9px 12px', borderRadius: '8px', backgroundColor: styleConfig.inputBg,
                    border: `1px solid ${styleConfig.inputBorder}`, color: styleConfig.textPrimary, fontSize: '13px', outline: 'none', fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }} 
                />
              </div>

              <button type="submit" style={{
                width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: styleConfig.primaryBlue, color: '#fff',
                fontSize: '13px', fontWeight: '800', border: 'none', cursor: 'pointer', marginTop: '4px',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
              }}>
                {isRtl ? 'تسجيل الدخول للنظام ←' : 'Sign In to System →'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '10px', color: styleConfig.textSecondary, fontWeight: '700' }}>
                {isRtl ? 'نظام مؤسسي موحد لكلية تكنولوجيا المعلومات' : 'Institutional System for KASIT'}
              </span>
            </div>

          </div>
        </div>

      </main>

      {/* الفوتر */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        padding: '12px 48px 16px 48px',
        backgroundColor: styleConfig.cardBg,
        borderTop: styleConfig.cardBorder,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '11px',
        color: styleConfig.textSecondary,
        backdropFilter: 'blur(16px)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="#" style={{ color: styleConfig.textSecondary, textDecoration: 'none', fontWeight: '700' }}>{isRtl ? 'عن النظام' : 'About'}</Link>
          <Link href="#" style={{ color: styleConfig.textSecondary, textDecoration: 'none', fontWeight: '700' }}>{isRtl ? 'الشروط والخصوصية' : 'Terms & Privacy'}</Link>
        </div>
        <div style={{ fontWeight: '700' }}>
          {isRtl 
            ? 'جميع الحقوق محفوظة © 2026 - كلية الملك عبدالله الثاني لتكنولوجيا المعلومات' 
            : 'All rights reserved © 2026 - KASIT, The University of Jordan'}
        </div>
      </footer>

    </div>
  );
}