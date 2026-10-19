'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CleanAdminControlPanelPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [activeTab, setActiveTab] = useState<'pending' | 'members'>('pending');

  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'د. أحمد الخلايلة',
      email: 'ahmad.kh@ju.edu.jo',
      department: 'علم الحاسوب (CS)',
      role: 'عضو هيئة تدريس'
    },
    {
      id: 2,
      name: 'د. سارة العبادي',
      email: 'sara.abadi@ju.edu.jo',
      department: 'تكنولوجيا معلومات الأعمال (BIT)',
      role: 'رئيس قسم'
    }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isRtl = lang === 'ar';
  const isDark = theme === 'dark';

  // ألوان مريحة وعملية بدون خلفيات صور
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

  const handleAction = (id: number) => {
    setRequests(prev => prev.filter(req => req.id !== id));
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

      {/* 1. الشريط العلوي (Header) - أبيض/كحلي مؤسسي نظيف بدون خلفيات ملونة */}
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
              KASIT ARCHIVE
            </span>
            <span style={{ fontSize: '11px', color: styleConfig.primaryBlue, fontWeight: '700' }}>
              {isRtl ? 'لوحة تحكم المشرف' : 'Admin Control Panel'}
            </span>
          </div>
        </div>

        {/* أزرار التحكم بدون أيقونات القمر أو الزحمة */}
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
            {isRtl ? '← العودة للوحة الرئيسية' : '← Back to Dashboard'}
          </Link>
        </div>
      </header>

      {/* 2. جسم المحتوى الإداري */}
      <main style={{
        flex: 1,
        padding: '36px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>

        {/* عنوان الصفحة */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: styleConfig.textPrimary, margin: '0 0 6px 0' }}>
            {isRtl ? 'لوحة تحكم المشرف' : 'Admin Control Panel'}
          </h1>
          <p style={{ fontSize: '13px', color: styleConfig.textSecondary, fontWeight: '600', margin: 0 }}>
            {isRtl ? 'إدارة صلاحيات أعضاء هيئة التدريس والوظائف الإدارية والطلبات المعلقة' : 'Manage faculty roles, permissions, and pending registration requests'}
          </p>
        </div>

        {/* التبويبات الرسمية */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{
            display: 'inline-flex', gap: '4px',
            backgroundColor: isDark ? '#1e293b' : '#e2e8f0',
            padding: '4px', borderRadius: '10px'
          }}>
            <button
              onClick={() => setActiveTab('pending')}
              style={{
                padding: '8px 22px', borderRadius: '7px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', border: 'none',
                backgroundColor: activeTab === 'pending' ? styleConfig.primaryBlue : 'transparent',
                color: activeTab === 'pending' ? '#fff' : styleConfig.textSecondary,
                transition: 'all 0.2s ease'
              }}
            >
              {isRtl ? `طلبات التسجيل المعلقة (${requests.length})` : `Pending Requests (${requests.length})`}
            </button>
            <button
              onClick={() => setActiveTab('members')}
              style={{
                padding: '8px 22px', borderRadius: '7px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', border: 'none',
                backgroundColor: activeTab === 'members' ? styleConfig.primaryBlue : 'transparent',
                color: activeTab === 'members' ? '#fff' : styleConfig.textSecondary,
                transition: 'all 0.2s ease'
              }}
            >
              {isRtl ? 'إدارة أعضاء هيئة التدريس والصلاحيات' : 'Faculty & Roles Management'}
            </button>
          </div>
        </div>

        {/* البطاقة الإدارية الرئيسية */}
        <div style={{
          backgroundColor: styleConfig.cardBg,
          border: styleConfig.cardBorder,
          borderRadius: '16px',
          padding: '28px',
          boxShadow: styleConfig.shadow
        }}>

          {activeTab === 'pending' ? (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: styleConfig.textPrimary, marginBottom: '18px' }}>
                {isRtl ? 'الطلبات الجديدة بانتظار الموافقة' : 'New Registration Requests Pending Approval'}
              </h3>

              {requests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', color: styleConfig.textSecondary, fontWeight: '600', fontSize: '13px' }}>
                  {isRtl ? 'لا توجد طلبات معلقة حالياً' : 'No pending registration requests'}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {requests.map((req) => (
                    <div key={req.id} style={{
                      padding: '16px 20px', borderRadius: '10px',
                      backgroundColor: styleConfig.itemBg,
                      border: styleConfig.cardBorder,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: styleConfig.textPrimary, marginBottom: '4px' }}>
                          {req.name} <span style={{ fontSize: '12px', color: styleConfig.primaryBlue, fontWeight: '700' }}>({req.email})</span>
                        </div>
                        <div style={{ fontSize: '12px', color: styleConfig.textSecondary, fontWeight: '600' }}>
                          {isRtl ? `القسم: ${req.department} • المطلوب: ${req.role}` : `Dept: ${req.department} • Role: ${req.role}`}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => handleAction(req.id)}
                          style={{
                            padding: '8px 18px', borderRadius: '6px',
                            backgroundColor: '#10b981', color: '#fff',
                            border: 'none', fontSize: '12px', fontWeight: '800', cursor: 'pointer'
                          }}
                        >
                          {isRtl ? 'موافقة' : 'Approve'}
                        </button>

                        <button
                          onClick={() => handleAction(req.id)}
                          style={{
                            padding: '8px 18px', borderRadius: '6px',
                            backgroundColor: '#ef4444', color: '#fff',
                            border: 'none', fontSize: '12px', fontWeight: '800', cursor: 'pointer'
                          }}
                        >
                          {isRtl ? 'رفض' : 'Reject'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 20px', color: styleConfig.textSecondary }}>
              <p style={{ fontSize: '13px', fontWeight: '700' }}>
                {isRtl ? 'قائمة أعضاء هيئة التدريس المسجلين وتعديل أدوارهم' : 'Active faculty directory and RBAC permissions management'}
              </p>
            </div>
          )}

        </div>

      </main>

      {/* 3. الفوتر */}
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
        <div>{isRtl ? 'نظام أرشفة KASIT - لوحة المشرف' : 'KASIT Archive System - Admin Panel'}</div>
        <div style={{ fontWeight: '700' }}>
          {isRtl ? 'جميع الحقوق محفوظة © 2026 - الجامعة الأردنية' : 'All rights reserved © 2026 - The University of Jordan'}
        </div>
      </footer>

    </div>
  );
  
}