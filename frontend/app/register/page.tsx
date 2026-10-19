'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('علم الحاسوب (CS)');
  const [requestedRole, setRequestedRole] = useState('عضو هيئة تدريس');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يتم إرسال طلب الانضمام إلى قاعدة البيانات بانتظار موافقة الأدمن
    setIsSubmitted(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#020617',
      color: '#f8fafc',
      fontFamily: "'Cairo', 'Inter', sans-serif",
      direction: 'rtl',
      margin: 0,
      padding: '24px',
      boxSizing: 'border-box',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* خلفية مبنى الكلية */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <img 
          src="/kasit-bg.jpg.webp" 
          alt="BG" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.18) contrast(120%)'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(2, 6, 23, 0.88)',
          backdropFilter: 'blur(4px)'
        }}></div>
      </div>

      {/* صندوق تقديم الطلب */}
      <div style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        border: '1px solid #334155',
        padding: '32px',
        borderRadius: '20px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        position: 'relative',
        zIndex: 10,
        backdropFilter: 'blur(10px)',
        textAlign: 'start'
      }}>
        
        {/* الترويسة */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            margin: '0 auto 12px auto',
            borderRadius: '12px',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src="/uj-logo.png.jfif" alt="UJ" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 4px 0' }}>تقديم طلب انضمام كادر أكاديمي</h1>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>كلية الملك عبدالله الثاني لتكنولوجيا المعلومات • الجامعة الأردنية</p>
        </div>

        {isSubmitted ? (
          /* حالة نجاح تقديم الطلب */
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div style={{ fontSize: '42px', marginBottom: '12px' }}>⏳</div>
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#34d399', marginBottom: '8px' }}>
              تم تقديم الطلب بنجاح!
            </h2>
            <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '20px' }}>
              طلبك الآن قيد المراجعة لدى إدارة الكلية (Admin Approval). سيتم تفعيل حسابك وإشعارك فور اعتماد الصلاحية.
            </p>
            <Link href="/login" style={{
              display: 'inline-block',
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '12px',
              textDecoration: 'none',
              boxSizing: 'border-box'
            }}>
              العودة لشاشة الدخول
            </Link>
          </div>
        ) : (
          /* النموذج */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                الاسم الكامل (مع اللقب الأكاديمي)
              </label>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="د. محمد جميل الخواطره" 
                style={{
                  width: '100%',
                  backgroundColor: '#020617',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '12px',
                  color: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                البريد الإلكتروني الجامعي الرسمي
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m.name@ju.edu.jo" 
                style={{
                  width: '100%',
                  backgroundColor: '#020617',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '12px',
                  color: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                القسم الأكاديمي
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#020617',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '12px',
                  color: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="علم الحاسوب (CS)">علم الحاسوب (CS)</option>
                <option value="أنظمة المعلومات الحاسوبية (CIS)">أنظمة المعلومات الحاسوبية (CIS)</option>
                <option value="تكنولوجيا معلومات الأعمال (BIT)">تكنولوجيا معلومات الأعمال (BIT)</option>
                <option value="الأمن السيبراني">الأمن السيبراني</option>
                <option value="الذكاء الاصطناعي علم البيانات">الذكاء الاصطناعي وعلم البيانات</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#cbd5e1', marginBottom: '6px' }}>
                الصفة الإدارية / الأكاديمية المطلوبة
              </label>
              <select
                value={requestedRole}
                onChange={(e) => setRequestedRole(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#020617',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '12px',
                  color: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="عضو هيئة تدريس">عضو هيئة تدريس</option>
                <option value="رئيس قسم">رئيس قسم</option>
                <option value="مساعد العميد">مساعد العميد للشؤون الإدارية/الاعتماد</option>
              </select>
            </div>

            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)',
                marginTop: '8px'
              }}
            >
              إرسال الطلب للمشرف
            </button>
          </form>
        )}

        {/* العودة للـ Login */}
        <div style={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
          <Link href="/login" style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'none' }}>
            لديك حساب بالفعل؟ تسجيل الدخول
          </Link>
        </div>

      </div>
    </div>
  );
  
}