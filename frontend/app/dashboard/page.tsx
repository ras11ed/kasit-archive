'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CleanKasitArchiveDashboard() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isRtl = lang === 'ar';
  const isDark = theme === 'dark';

  const styleConfig = {
    bg: isDark ? '#0b0f19' : '#f8fafc',
    cardBg: isDark ? '#151e32' : '#ffffff',
    itemBg: isDark ? '#1e293b' : '#f1f5f9',
    cardBorder: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
    textPrimary: isDark ? '#f8fafc' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#475569',
    primaryBlue: '#2563eb',
    shadow: isDark
      ? '0 10px 30px rgba(0, 0, 0, 0.4)'
      : '0 4px 20px rgba(0, 0, 0, 0.04)'
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: styleConfig.bg,
      color: styleConfig.textPrimary,
      fontFamily: isRtl ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif",
      direction: isRtl ? 'rtl' : 'ltr',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'all 0.2s ease'
    }}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
      `}</style>

      {/* 1. الشريط العلوي (Header) */}
      <header style={{
        padding: '12px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: styleConfig.cardBg,
        borderBottom: styleConfig.cardBorder,
        boxShadow: styleConfig.shadow
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1', padding: '3px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <img src="/uj-logo.png.jfif" alt="UJ" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <span style={{ fontSize: '16px', fontWeight: '800', color: styleConfig.textPrimary, display: 'block', letterSpacing: '-0.3px' }}>
              KASIT ARCHIVE DASHBOARD
            </span>
            <span style={{ fontSize: '11px', color: styleConfig.primaryBlue, fontWeight: '700' }}>
              {isRtl ? 'لوحة التحكم بالاعتماد الأكاديمي والنسب العلمية' : 'Academic Accreditation & QA Panel'}
            </span>
          </div>
        </div>

        {/* أزرار التحكم */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* رابط التحويل المباشر لصفحة الـ Upload */}
          <Link href="/upload" style={{
            padding: '8px 18px', borderRadius: '8px', backgroundColor: styleConfig.primaryBlue, color: '#fff',
            fontSize: '12px', fontWeight: '800', textDecoration: 'none', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
            display: 'inline-block'
          }}>
            {isRtl ? '+ رفع مستند / خطة جديدة' : '+ Upload Document / Plan'}
          </Link>

          <button 
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            style={{
              padding: '7px 14px', borderRadius: '8px',
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              border: '1px solid #cbd5e1', color: styleConfig.textPrimary,
              fontSize: '12px', fontWeight: '700', cursor: 'pointer'
            }}
          >
            {isDark ? (isRtl ? 'الوضع النهاري' : 'Light Mode') : (isRtl ? 'الوضع الليلي' : 'Dark Mode')}
          </button>

          <button 
            onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
            style={{
              padding: '7px 14px', borderRadius: '8px',
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              border: '1px solid #cbd5e1', color: styleConfig.textPrimary,
              fontSize: '12px', fontWeight: '700', cursor: 'pointer'
            }}
          >
            {isRtl ? 'English' : 'العربية'}
          </button>

          <button 
            onClick={handleLogout}
            style={{
              padding: '7px 14px', borderRadius: '8px',
              backgroundColor: '#ef4444', color: '#fff',
              border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer'
            }}
          >
            {isRtl ? 'تسجيل الخروج' : 'Sign Out'}
          </button>
        </div>
      </header>

      {/* 2. جسم لوحة التحكم */}
      <main style={{
        flex: 1,
        padding: '24px 48px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>

        {/* الكارت العلوي: الترحيب وأرقام الإحصائيات السريعة */}
        <div style={{
          backgroundColor: styleConfig.cardBg,
          border: styleConfig.cardBorder,
          borderRadius: '16px',
          padding: '20px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: styleConfig.shadow
        }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: styleConfig.textPrimary, margin: '0 0 4px 0' }}>
              {isRtl ? 'نظام إدارة الاعتماد ومحاضر الاجتماعات الأكاديمية' : 'Accreditation & Academic Meeting Management System'}
            </h2>
            <p style={{ fontSize: '12px', color: styleConfig.textSecondary, fontWeight: '600', margin: 0 }}>
              {isRtl ? 'متابعة حية لمؤشرات هيئة الاعتماد الأردنية (HEAC) والاعتماد الدولي (ABET)' : 'Real-time compliance monitoring for HEAC and ABET quality standards'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{
              padding: '10px 18px', borderRadius: '12px',
              backgroundColor: styleConfig.itemBg, border: styleConfig.cardBorder,
              textAlign: 'center', minWidth: '100px'
            }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#10b981' }}>98.2%</div>
              <div style={{ fontSize: '11px', color: styleConfig.textSecondary, fontWeight: '700' }}>{isRtl ? 'مطابقة الجودة' : 'Quality Match'}</div>
            </div>

            <div style={{
              padding: '10px 18px', borderRadius: '12px',
              backgroundColor: styleConfig.itemBg, border: styleConfig.cardBorder,
              textAlign: 'center', minWidth: '100px'
            }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: styleConfig.primaryBlue }}>142</div>
              <div style={{ fontSize: '11px', color: styleConfig.textSecondary, fontWeight: '700' }}>{isRtl ? 'مستند مؤرشف' : 'Archived Docs'}</div>
            </div>
          </div>
        </div>

        {/* الشبكة السفلية */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* مركز تنبيه المواعيد النهائية (Deadlines) */}
          <div style={{
            backgroundColor: styleConfig.cardBg,
            border: styleConfig.cardBorder,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: styleConfig.shadow
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: styleConfig.textPrimary, margin: 0 }}>
                {isRtl ? 'مركز تنبيه المواعيد النهائية (Deadlines)' : 'Deadlines & Notifications'}
              </h3>
              <span style={{ fontSize: '11px', color: styleConfig.primaryBlue, fontWeight: '700' }}>
                {isRtl ? 'مفهرس بقرارات OCR' : 'Indexed via OCR'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { title: 'تقرير مطابقة اعتماد ABET الدولي', sub: 'قسم علم الحاسوب • الموعد: 01-11-2026', days: 'متبقي 15 يوم', urgent: true },
                { title: 'محضر اجتماع مجلس قسم أمن المعلومات', sub: 'قسم الأمن السيبراني • الموعد: 05-11-2026', days: 'متبقي 19 يوم', urgent: false },
                { title: 'تحديث الطاقة الاستيعابية للطلبة المستجدين', sub: 'قسم الذكاء الاصطناعي • الموعد: 12-11-2026', days: 'متبقي 26 يوم', urgent: false }
              ].map((dl, idx) => (
                <div key={idx} style={{
                  padding: '12px 16px', borderRadius: '10px',
                  backgroundColor: styleConfig.itemBg, border: dl.urgent ? '1px solid #ef4444' : styleConfig.cardBorder,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: styleConfig.textPrimary }}>{dl.title}</div>
                    <div style={{ fontSize: '10px', color: styleConfig.textSecondary, fontWeight: '600', marginTop: '2px' }}>{dl.sub}</div>
                  </div>
                  <div>
                    <span style={{
                      padding: '4px 10px', borderRadius: '6px',
                      backgroundColor: dl.urgent ? 'rgba(239, 68, 68, 0.15)' : 'rgba(37, 99, 235, 0.12)',
                      color: dl.urgent ? '#ef4444' : styleConfig.primaryBlue,
                      fontSize: '10px', fontWeight: '800'
                    }}>
                      {dl.days}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الطاقة الاستيعابية والنسب العلمية (HEAC) */}
          <div style={{
            backgroundColor: styleConfig.cardBg,
            border: styleConfig.cardBorder,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: styleConfig.shadow
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: styleConfig.textPrimary, margin: 0 }}>
                {isRtl ? 'الطاقة الاستيعابية والنسب العلمية (HEAC)' : 'Capacity & Ratios (HEAC)'}
              </h3>
              <span style={{ fontSize: '11px', color: styleConfig.textSecondary, fontWeight: '600' }}>
                {isRtl ? 'الطلبة المستجدين vs الأكاديميين' : 'Students vs Academic Staff'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { dept: 'علم الحاسوب (CS)', ratio: '17.7 : 1', stats: 'الطلبة: 320 | الكادر: 18 دكتور', status: 'ضمن المعايير', valid: true },
                { dept: 'الأمن السيبراني (CYS)', ratio: '21.8 : 1', stats: 'الطلبة: 240 | الكادر: 11 دكتور', status: 'تنبيه طاقة استيعابية', valid: false },
                { dept: 'الذكاء الاصطناعي (AI)', ratio: '15.8 : 1', stats: 'الطلبة: 190 | الكادر: 12 دكتور', status: 'ضمن المعايير', valid: true },
                { dept: 'هندسة البرمجيات (SE)', ratio: '20.0 : 1', stats: 'الطلبة: 280 | الكادر: 14 دكتور', status: 'ضمن المعايير', valid: true }
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '12px 16px', borderRadius: '10px',
                  backgroundColor: styleConfig.itemBg, border: styleConfig.cardBorder,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: styleConfig.textPrimary }}>{item.dept}</div>
                    <div style={{ fontSize: '10px', color: styleConfig.textSecondary, fontWeight: '600', marginTop: '2px' }}>{item.stats}</div>
                  </div>
                  <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: '900', color: item.valid ? styleConfig.textPrimary : '#f59e0b' }}>{item.ratio}</div>
                    <div style={{ fontSize: '10px', color: item.valid ? '#10b981' : '#f59e0b', fontWeight: '800' }}>
                      {item.valid ? '✓ ' : '⚠️ '} {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* 3. الفوتر */}
      <footer style={{
        padding: '12px 48px',
        backgroundColor: styleConfig.cardBg,
        borderTop: styleConfig.cardBorder,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: styleConfig.textSecondary
      }}>
        <div>{isRtl ? 'نظام أرشفة KASIT - لوحة التحكم الأكاديمية' : 'KASIT Archive System - Academic Dashboard'}</div>
        <div style={{ fontWeight: '700' }}>
          {isRtl ? 'جميع الحقوق محفوظة © 2026 - الجامعة الأردنية' : 'All rights reserved © 2026 - The University of Jordan'}
        </div>
      </footer>

    </div>
  );
}