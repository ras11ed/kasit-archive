'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PerfectDocumentAnalyzerPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [activeTab, setActiveTab] = useState<'ocr' | 'details' | 'qa'>('ocr');

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
              KASIT DOCUMENT ANALYZER
            </span>
            <span style={{ fontSize: '11px', color: styleConfig.primaryBlue, fontWeight: '700' }}>
              {isRtl ? 'معاينة المستند وتحليل الاعتماد الأكاديمي' : 'Document Preview & QA Compliance Engine'}
            </span>
          </div>
        </div>

        {/* أزرار التحكم */}
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

          <Link href="/dashboard" style={{
            padding: '7px 18px', borderRadius: '8px', backgroundColor: styleConfig.primaryBlue, color: '#fff',
            fontSize: '12px', fontWeight: '800', textDecoration: 'none', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
          }}>
            {isRtl ? '← العودة للوحة التحكم' : '← Back to Dashboard'}
          </Link>
        </div>
      </header>

      {/* 2. جسم الصفحة الرئيسي */}
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

        {/* الكارت العلوي: بيانات المستند وشارة الاعتماد */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: styleConfig.textPrimary, margin: 0 }}>
                {isRtl ? 'خطة مساق الذكاء الاصطناعي (CS401)' : 'Syllabus: Artificial Intelligence (CS401)'}
              </h2>
              <span style={{ padding: '3px 10px', borderRadius: '8px', backgroundColor: 'rgba(37, 99, 235, 0.12)', color: styleConfig.primaryBlue, fontSize: '11px', fontWeight: '800' }}>
                DOC-101 • HEAC
              </span>
            </div>
            <p style={{ fontSize: '12px', color: styleConfig.textSecondary, fontWeight: '600', margin: 0 }}>
              {isRtl ? 'الاعتماد الوطني الأردني (HEAC) • كلية الملك عبدالله الثاني لتكنولوجيا المعلومات' : 'HEAC National Accreditation • School of IT'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{
              padding: '8px 16px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981',
              fontSize: '12px', fontWeight: '800', border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              {isRtl ? '✓ معتمد ومطابق للمقاييس الأكاديمية' : '✓ Accredited & QA Compliant'}
            </span>

            <button style={{
              padding: '8px 18px', borderRadius: '8px', backgroundColor: styleConfig.primaryBlue, color: '#fff',
              fontSize: '12px', fontWeight: '800', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
            }}>
              {isRtl ? 'تصدير تقرير الاعتماد' : 'Export QA Report'}
            </button>
          </div>
        </div>

        {/* القسم الأوسط: تقسيم شبكي نظيف من عمودين */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* العمود الأول: التبويبات والمخرجات المستخرجة */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* أزرار التبويبات */}
            <div style={{
              display: 'flex', gap: '4px',
              backgroundColor: isDark ? '#1e293b' : '#e2e8f0',
              padding: '4px', borderRadius: '10px'
            }}>
              <button
                onClick={() => setActiveTab('ocr')}
                style={{
                  flex: 1, padding: '8px', borderRadius: '7px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', border: 'none',
                  backgroundColor: activeTab === 'ocr' ? styleConfig.primaryBlue : 'transparent',
                  color: activeTab === 'ocr' ? '#fff' : styleConfig.textSecondary,
                  transition: 'all 0.2s ease'
                }}
              >
                {isRtl ? 'المواعيد والنصوص المستخرجة' : 'Extracted Dates & Snippets'}
              </button>
              <button
                onClick={() => setActiveTab('details')}
                style={{
                  flex: 1, padding: '8px', borderRadius: '7px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', border: 'none',
                  backgroundColor: activeTab === 'details' ? styleConfig.primaryBlue : 'transparent',
                  color: activeTab === 'details' ? '#fff' : styleConfig.textSecondary,
                  transition: 'all 0.2s ease'
                }}
              >
                {isRtl ? 'البيانات الأكاديمية' : 'Academic Data'}
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                style={{
                  flex: 1, padding: '8px', borderRadius: '7px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', border: 'none',
                  backgroundColor: activeTab === 'qa' ? styleConfig.primaryBlue : 'transparent',
                  color: activeTab === 'qa' ? '#fff' : styleConfig.textSecondary,
                  transition: 'all 0.2s ease'
                }}
              >
                {isRtl ? 'مطابقة الاعتماد (QA)' : 'QA Compliance'}
              </button>
            </div>

            {/* بطاقة المواعيد المستخرجة */}
            <div style={{
              backgroundColor: styleConfig.cardBg,
              border: styleConfig.cardBorder,
              borderRadius: '16px',
              padding: '20px',
              boxShadow: styleConfig.shadow,
              display: 'flex', flexDirection: 'column', gap: '12px'
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: styleConfig.textPrimary, margin: 0, borderBottom: styleConfig.cardBorder, paddingBottom: '10px' }}>
                {isRtl ? 'المواعيد المكتشفة تلقائياً (Deadlines)' : 'Detected Decision Deadlines'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  padding: '12px 16px', borderRadius: '8px',
                  backgroundColor: styleConfig.itemBg, border: styleConfig.cardBorder,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: styleConfig.textPrimary }}>
                    {isRtl ? 'الموعد النهائي لمراجعة الاعتماد الأكاديمي' : 'Academic QA Review Deadline'}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#ef4444' }}>2026-11-01</span>
                </div>

                <div style={{
                  padding: '12px 16px', borderRadius: '8px',
                  backgroundColor: styleConfig.itemBg, border: styleConfig.cardBorder,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: styleConfig.textPrimary }}>
                    {isRtl ? 'موعد إقرار النتائج في مجلس القسم' : 'Council Approval Deadline'}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: styleConfig.primaryBlue }}>2026-12-15</span>
                </div>
              </div>
            </div>

            {/* بطاقة النصوص المستخرجة */}
            <div style={{
              backgroundColor: styleConfig.cardBg,
              border: styleConfig.cardBorder,
              borderRadius: '16px',
              padding: '20px',
              boxShadow: styleConfig.shadow,
              display: 'flex', flexDirection: 'column', gap: '10px'
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: styleConfig.textPrimary, margin: 0, borderBottom: styleConfig.cardBorder, paddingBottom: '10px' }}>
                {isRtl ? 'النصوص والأقسام المستخرجة من المستند' : 'Extracted Document Snippets'}
              </h3>

              <div style={{
                fontSize: '11px', color: styleConfig.textSecondary, lineHeight: '1.7', fontWeight: '600',
                backgroundColor: styleConfig.itemBg, padding: '12px 16px', borderRadius: '8px', border: styleConfig.cardBorder
              }}>
                • {isRtl ? 'الجامعة الأردنية - كلية الملك عبدالله الثاني لتكنولوجيا المعلومات.' : 'The University of Jordan - KASIT.'}<br />
                • {isRtl ? 'قسم الذكاء الاصطناعي والبيانات - خطة مادة CS401 للعام الأكاديمي 2026.' : 'AI Department - Syllabus CS401 (2026).'}<br />
                • {isRtl ? 'الأهداف الأكاديمية: تغطية معالجة اللغات الطبيعية (NLP) وتطبيقات التعلم العميق.' : 'Topics: NLP, Neural Networks & Deep Learning.'}<br />
                • {isRtl ? 'الساعات المعتمدة: 3 ساعات معتمدة (مطابقة لمعايير هيئة الاعتماد الأردنية HEAC).' : 'Credit Hours: 3 (Fully HEAC compliant).'}
              </div>
            </div>

          </div>

          {/* العمود الثاني: معاينة المستند الأصلي (PDF View) */}
          <div style={{
            backgroundColor: styleConfig.cardBg,
            border: styleConfig.cardBorder,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: styleConfig.shadow,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: styleConfig.cardBorder, paddingBottom: '10px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: styleConfig.textPrimary, margin: 0 }}>
                {isRtl ? 'معاينة الملف الأصلي (PDF Preview)' : 'Original PDF Preview'}
              </h3>
              <span style={{ fontSize: '11px', color: styleConfig.textSecondary, fontWeight: '600' }}>
                {isRtl ? 'صفحة 1 من 3' : 'Page 1 of 3'}
              </span>
            </div>

            {/* ورقة المعاينة الشيك والمريحة للعين */}
            <div style={{
              backgroundColor: isDark ? '#020617' : '#0f172a',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '24px 20px',
              minHeight: '270px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)'
            }}>
              <div>
                <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '12px', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '900', margin: '0 0 4px 0', letterSpacing: '-0.3px' }}>
                    {isRtl ? 'الجامعة الأردنية • كلية IT' : 'The University of Jordan • School of IT'}
                  </h4>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, fontWeight: '600' }}>
                    {isRtl ? 'قسم الذكاء الاصطناعي والبيانات - خطة مساق أكاديمية معتمدة لعام 2026' : 'AI Department - Approved Academic Syllabus 2026'}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', color: '#cbd5e1', fontWeight: '600' }}>
                  <div>{isRtl ? 'اسم المادة: الذكاء الاصطناعي (CS401)' : 'Course: Artificial Intelligence (CS401)'}</div>
                  <div>{isRtl ? 'مدرس المادة: د. محمد الخواطره' : 'Instructor: Dr. Mohammad Khawatreh'}</div>
                  <div>{isRtl ? 'المنصب الإداري: رئيس قسم الذكاء الاصطناعي' : 'Role: Department Head'}</div>
                  <div>{isRtl ? 'الموعد النهائي المعتمد: 01-11-2026' : 'Deadline: 01-11-2026'}</div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '11px',
                color: '#93c5fd',
                marginTop: '16px'
              }}>
                {isRtl ? 'تغطي المادة مفاهيم الشبكات العصبية الخوارزميات المتقدمة لمعايير ABET الدولية.' : 'Covers Neural Networks and Advanced Algorithms for ABET standards.'}
              </div>
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
        <div>{isRtl ? 'نظام أرشفة KASIT - وحدة تحليل ومعاينة المستندات' : 'KASIT Archive System - Document Analyzer'}</div>
        <div style={{ fontWeight: '700' }}>
          {isRtl ? 'جميع الحقوق محفوظة © 2026 - الجامعة الأردنية' : 'All rights reserved © 2026 - The University of Jordan'}
        </div>
      </footer>

    </div>
  );
}