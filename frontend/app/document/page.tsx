'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DocumentPreviewPage() {
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
    successGreen: '#10b981',
    shadow: isDark
      ? '0 10px 30px rgba(0, 0, 0, 0.4)'
      : '0 4px 20px rgba(0, 0, 0, 0.04)'
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
      transition: 'all 0.2s ease'
    }}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
      `}</style>

      {/* Header */}
      <header style={{
        padding: '14px 48px',
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
              KASIT ARCHIVE ENGINE
            </span>
            <span style={{ fontSize: '11px', color: styleConfig.primaryBlue, fontWeight: '700' }}>
              {isRtl ? 'وحدة أرشفة المستندات ومعالجة الاعتماد الأكاديمي' : 'Document Archiving & Processing Unit'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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

          <Link href="/upload" style={{
            padding: '7px 18px', borderRadius: '8px', backgroundColor: styleConfig.primaryBlue, color: '#fff',
            fontSize: '12px', fontWeight: '800', textDecoration: 'none', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
          }}>
            {isRtl ? '← رفع مستند جديد' : '← Upload New Document'}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '32px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: styleConfig.textPrimary, margin: '0 0 6px 0' }}>
              {isRtl ? 'معاينة وأرشفة المستند الأكاديمي' : 'Document Preview & Archiving'}
            </h1>
            <p style={{ fontSize: '13px', color: styleConfig.textSecondary, fontWeight: '600', margin: 0 }}>
              {isRtl ? 'مراجعة بيانات الاستخراج وتدقيق المطابقة قبل الاعتماد النهائي' : 'Review extraction details and verify compliance before final commit'}
            </p>
          </div>

          <span style={{
            padding: '6px 14px', borderRadius: '20px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)', color: styleConfig.successGreen,
            fontSize: '12px', fontWeight: '800', border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            {isRtl ? 'جاهز للاعتماد النهائي ✓' : 'Ready for Final Archiving ✓'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          
          {/* Card 1: Details */}
          <div style={{
            backgroundColor: styleConfig.cardBg,
            border: styleConfig.cardBorder,
            borderRadius: '16px',
            padding: '24px',
            boxShadow: styleConfig.shadow,
            display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: styleConfig.textPrimary, margin: 0, borderBottom: styleConfig.cardBorder, paddingBottom: '12px' }}>
              {isRtl ? 'البيانات المستخرجة وتصنيف الاعتماد' : 'Extracted Metadata'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: styleConfig.itemBg, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: styleConfig.textSecondary, fontWeight: '700' }}>{isRtl ? 'نوع الاعتماد / المستند:' : 'Doc Type:'}</span>
                <span style={{ fontSize: '12px', color: styleConfig.textPrimary, fontWeight: '800' }}>{isRtl ? 'الاعتماد الوطني الأردني (HEAC)' : 'HEAC Accreditation'}</span>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: styleConfig.itemBg, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: styleConfig.textSecondary, fontWeight: '700' }}>{isRtl ? 'الرتبة الأكاديمية:' : 'Academic Rank:'}</span>
                <span style={{ fontSize: '12px', color: styleConfig.textPrimary, fontWeight: '800' }}>{isRtl ? 'أستاذ مشارك (Associate Prof)' : 'Associate Prof'}</span>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: styleConfig.itemBg, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: styleConfig.textSecondary, fontWeight: '700' }}>{isRtl ? 'التخصص الدقيق:' : 'Specialization:'}</span>
                <span style={{ fontSize: '12px', color: styleConfig.textPrimary, fontWeight: '800' }}>{isRtl ? 'الذكاء الاصطناعي ومعالجة اللغات' : 'AI & NLP'}</span>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: styleConfig.itemBg, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: styleConfig.textSecondary, fontWeight: '700' }}>{isRtl ? 'دقة معالجة النموذج (AI Score):' : 'AI Score:'}</span>
                <span style={{ fontSize: '12px', color: styleConfig.successGreen, fontWeight: '800' }}>98.4%</span>
              </div>
            </div>

            <button 
              onClick={() => alert('تمت الأرشفة وتخزين المستند في قاعدة البيانات بنجاح!')}
              style={{
                width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: styleConfig.successGreen, color: '#fff',
                fontSize: '13px', fontWeight: '800', border: 'none', cursor: 'pointer', marginTop: '12px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
              }}
            >
              {isRtl ? 'تأكيد الحفظ في الأرشيف النهائي ✓' : 'Confirm Final Archiving ✓'}
            </button>
          </div>

          {/* Card 2: Document Viewer Placeholder */}
          <div style={{
            backgroundColor: styleConfig.cardBg,
            border: styleConfig.cardBorder,
            borderRadius: '16px',
            padding: '24px',
            boxShadow: styleConfig.shadow,
            display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: styleConfig.textPrimary, margin: 0, borderBottom: styleConfig.cardBorder, paddingBottom: '12px' }}>
              {isRtl ? 'معاينة ملف الـ PDF' : 'Document PDF View'}
            </h3>

            <div style={{
              flex: 1,
              minHeight: '260px',
              borderRadius: '12px',
              border: `2px dashed ${styleConfig.inputBorder}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: styleConfig.itemBg,
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: styleConfig.textPrimary, marginBottom: '4px' }}>
                {isRtl ? 'محضر_اجتماع_اعتماد_HEAC_2026.pdf' : 'HEAC_Accreditation_Minutes_2026.pdf'}
              </div>
              <div style={{ fontSize: '11px', color: styleConfig.textSecondary, fontWeight: '600' }}>
                {isRtl ? 'حجم الملف: 1.4 MB • تم الفحص الأمني بنجاح' : 'Size: 1.4 MB • Security Verified'}
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer style={{
        padding: '14px 48px',
        backgroundColor: styleConfig.cardBg,
        borderTop: styleConfig.cardBorder,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: styleConfig.textSecondary
      }}>
        <div>{isRtl ? 'نظام أرشفة KASIT - وحدة المعاينة' : 'KASIT Archive System - Document Unit'}</div>
        <div style={{ fontWeight: '700' }}>
          {isRtl ? 'جميع الحقوق محفوظة © 2026 - الجامعة الأردنية' : 'All rights reserved © 2026 - The University of Jordan'}
        </div>
      </footer>

    </div>
  );
}