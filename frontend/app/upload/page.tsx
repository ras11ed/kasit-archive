'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2'; // استدعاء مكتبة SweetAlert2

export default function CleanUploadKasitArchivePage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('الاعتماد الوطني الأردني (معايير HEAC)');
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
    inputBg: isDark ? '#1e293b' : '#ffffff',
    inputBorder: isDark ? '#334155' : '#cbd5e1',
    shadow: isDark
      ? '0 10px 30px rgba(0, 0, 0, 0.4)'
      : '0 4px 20px rgba(0, 0, 0, 0.04)'
  };

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من إرفاق الملف باستخدام SweetAlert2
    if (!uploadedFile) {
      Swal.fire({
        icon: 'warning',
        title: isRtl ? 'تنبيه هام' : 'Warning',
        text: isRtl ? 'يرجى إرفاق ملف الـ PDF أولاً لبدء المعالجة والأرشفة!' : 'Please attach a PDF file first!',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#2563eb',
        background: isDark ? '#151e32' : '#fff',
        color: isDark ? '#f8fafc' : '#0f172a'
      });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 1200);
  };

  const handleCancel = () => {
    setShowResults(false);
  };

  const handleUpload = async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: isRtl ? 'تم الرفع بنجاح' : 'Success',
          text: isRtl ? 'تم رفع الملف بنجاح إلى النظام!' : 'File uploaded successfully!',
          timer: 1500,
          showConfirmButton: false,
          background: isDark ? '#151e32' : '#fff',
          color: isDark ? '#f8fafc' : '#0f172a'
        });
        console.log('Upload success:', data);
      } else {
        Swal.fire({
          icon: 'error',
          title: isRtl ? 'خطأ في الرفع' : 'Upload Failed',
          text: data.error || (isRtl ? 'حدث خطأ أثناء الرفع' : 'An error occurred'),
          confirmButtonColor: '#ef4444',
          background: isDark ? '#151e32' : '#fff',
          color: isDark ? '#f8fafc' : '#0f172a'
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      Swal.fire({
        icon: 'error',
        title: isRtl ? 'خطأ في الاتصال' : 'Connection Error',
        text: isRtl ? 'تعذر الاتصال بالخادم، تأكد من تشغيل الـ Backend' : 'Server connection failed',
        confirmButtonColor: '#ef4444',
        background: isDark ? '#151e32' : '#fff',
        color: isDark ? '#f8fafc' : '#0f172a'
      });
    }
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

      {/* الشريط العلوي */}
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

          <Link href="/dashboard" style={{
            padding: '7px 18px', borderRadius: '8px', backgroundColor: styleConfig.primaryBlue, color: '#fff',
            fontSize: '12px', fontWeight: '800', textDecoration: 'none', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
          }}>
            {isRtl ? '← العودة للوحة التحكم' : '← Back to Dashboard'}
          </Link>
        </div>
      </header>

      {/* محتوى الصفحة */}
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

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: styleConfig.textPrimary, margin: '0 0 6px 0' }}>
            {isRtl ? 'رفع وأرشفة مستند أكاديمي' : 'Upload & Archive Academic Document'}
          </h1>
          <p style={{ fontSize: '13px', color: styleConfig.textSecondary, fontWeight: '600', margin: 0 }}>
            {isRtl ? 'إدخال بيانات المستند وتصنيفات الاعتماد للتحليل والأرشفة الآلية' : 'Enter document data and accreditation metrics for automated indexing'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '800', color: styleConfig.primaryBlue }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: styleConfig.primaryBlue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>1</span>
              {isRtl ? 'تعبئة البيانات وإرفاق الملف' : 'Fill Details & Upload'}
            </div>
            <div style={{ width: '40px', height: '2px', backgroundColor: showResults ? styleConfig.primaryBlue : (isDark ? '#334155' : '#cbd5e1') }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '800', color: showResults ? '#10b981' : styleConfig.textSecondary }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: showResults ? '#10b981' : styleConfig.itemBg, color: showResults ? '#fff' : styleConfig.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>2</span>
              {isRtl ? 'معالجة الـ AI وتأكيد الأرشفة' : 'AI Analysis & Confirmation'}
            </div>
          </div>
        </div>

        <form onSubmit={handleProcess} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          
          <div style={{
            backgroundColor: styleConfig.cardBg,
            border: styleConfig.cardBorder,
            borderRadius: '16px',
            padding: '24px',
            boxShadow: styleConfig.shadow,
            display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: styleConfig.textPrimary, margin: 0, borderBottom: styleConfig.cardBorder, paddingBottom: '12px' }}>
              {isRtl ? 'بيانات الكادر والمنصب الأكاديمي' : 'Faculty Member & Academic Details'}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: styleConfig.textSecondary, marginBottom: '4px' }}>
                  {isRtl ? 'الرتبة الأكاديمية الحالية' : 'Current Rank'}
                </label>
                <select style={{
                  width: '100%', padding: '9px 12px', borderRadius: '8px', backgroundColor: styleConfig.inputBg,
                  border: `1px solid ${styleConfig.inputBorder}`, color: styleConfig.textPrimary, fontSize: '12px', outline: 'none', fontWeight: '600'
                }}>
                  <option>{isRtl ? 'أستاذ مساعد (Assistant Prof)' : 'Assistant Prof'}</option>
                  <option>{isRtl ? 'أستاذ مشارك (Associate Prof)' : 'Associate Prof'}</option>
                  <option>{isRtl ? 'أستاذ (Professor)' : 'Professor'}</option>
                  <option>{isRtl ? 'مدرس (Instructor)' : 'Instructor'}</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: styleConfig.textSecondary, marginBottom: '4px' }}>
                  {isRtl ? 'تاريخ الحصول على الرتبة' : 'Date Obtained'}
                </label>
                <input type="date" style={{
                  width: '100%', padding: '8px 12px', borderRadius: '8px', backgroundColor: styleConfig.inputBg,
                  border: `1px solid ${styleConfig.inputBorder}`, color: styleConfig.textPrimary, fontSize: '12px', outline: 'none', fontWeight: '600'
                }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: styleConfig.textSecondary, marginBottom: '4px' }}>
                {isRtl ? 'المنصب الإداري (إن وجد)' : 'Administrative Position'}
              </label>
              <select style={{
                width: '100%', padding: '9px 12px', borderRadius: '8px', backgroundColor: styleConfig.inputBg,
                border: `1px solid ${styleConfig.inputBorder}`, color: styleConfig.textPrimary, fontSize: '12px', outline: 'none', fontWeight: '600'
              }}>
                <option>{isRtl ? 'بدون منصب إداري' : 'None'}</option>
                <option>{isRtl ? 'رئيس قسم' : 'Department Head'}</option>
                <option>{isRtl ? 'مساعد العميد للشؤون الأكاديمية' : 'Assistant Dean'}</option>
                <option>{isRtl ? 'نائب العميد' : 'Vice Dean'}</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: styleConfig.textSecondary, marginBottom: '4px' }}>
                  {isRtl ? 'التخصص الدقيق' : 'Specialization'}
                </label>
                <input type="text" placeholder={isRtl ? 'مثال: ذكاء اصطناعي' : 'e.g., AI'} style={{
                  width: '100%', padding: '9px 12px', borderRadius: '8px', backgroundColor: styleConfig.inputBg,
                  border: `1px solid ${styleConfig.inputBorder}`, color: styleConfig.textPrimary, fontSize: '12px', outline: 'none', fontWeight: '600'
                }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: styleConfig.textSecondary, marginBottom: '4px' }}>
                  {isRtl ? 'الشهادات المهنية المعتمدة' : 'Certifications'}
                </label>
                <input type="text" placeholder={isRtl ? 'مثال: ABET Assessor' : 'e.g., ABET Assessor'} style={{
                  width: '100%', padding: '9px 12px', borderRadius: '8px', backgroundColor: styleConfig.inputBg,
                  border: `1px solid ${styleConfig.inputBorder}`, color: styleConfig.textPrimary, fontSize: '12px', outline: 'none', fontWeight: '600'
                }} />
              </div>
            </div>

            <button type="submit" disabled={isProcessing} style={{
              width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: styleConfig.primaryBlue, color: '#fff',
              fontSize: '13px', fontWeight: '800', border: 'none', cursor: 'pointer', marginTop: '8px',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)', transition: 'all 0.2s ease'
            }}>
              {isProcessing ? (isRtl ? 'جاري معالجة المستند بواسطة الـ AI...' : 'Processing Document...') : (isRtl ? 'بدء المعالجة والأرشفة ←' : 'Start Processing →')}
            </button>
          </div>

          <div style={{
            backgroundColor: styleConfig.cardBg,
            border: styleConfig.cardBorder,
            borderRadius: '16px',
            padding: '24px',
            boxShadow: styleConfig.shadow,
            display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: styleConfig.textPrimary, margin: 0, borderBottom: styleConfig.cardBorder, paddingBottom: '12px' }}>
              {isRtl ? 'تصنيف الاعتماد ومحاضر الاجتماعات' : 'Accreditation Classification & File Upload'}
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: styleConfig.textSecondary, marginBottom: '4px' }}>
                {isRtl ? 'نوع المستند الأكاديمي' : 'Document Type'}
              </label>
              <select 
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                style={{
                  width: '100%', padding: '9px 12px', borderRadius: '8px', backgroundColor: styleConfig.inputBg,
                  border: `1px solid ${styleConfig.inputBorder}`, color: styleConfig.textPrimary, fontSize: '12px', outline: 'none', fontWeight: '600'
                }}
              >
                <option value="الاعتماد الوطني الأردني (معايير HEAC)">{isRtl ? 'الاعتماد الوطني الأردني (معايير HEAC)' : 'HEAC Accreditation'}</option>
                <option value="الاعتماد الدولي (معايير ABET)">{isRtl ? 'الاعتماد الدولي (معايير ABET)' : 'ABET Accreditation'}</option>
                <option value="محضر اجتماع مجلس قسم">{isRtl ? 'محضر اجتماع مجلس قسم' : 'Department Council Minutes'}</option>
                <option value="تحديث خطة دراسية">{isRtl ? 'تحديث خطة دراسية' : 'Study Plan Update'}</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: styleConfig.textSecondary, marginBottom: '4px' }}>
                  {isRtl ? 'عدد الطلبة المستجدين بالقسم' : 'New Students Count'}
                </label>
                <input type="number" placeholder={isRtl ? 'مثال: 120' : 'e.g., 120'} style={{
                  width: '100%', padding: '8px 12px', borderRadius: '8px', backgroundColor: styleConfig.inputBg,
                  border: `1px solid ${styleConfig.inputBorder}`, color: styleConfig.textPrimary, fontSize: '12px', outline: 'none', fontWeight: '600'
                }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: styleConfig.textSecondary, marginBottom: '4px' }}>
                  {isRtl ? 'الموعد النهائي لاتخاذ القرار (Deadline)' : 'Decision Deadline'}
                </label>
                <input type="date" style={{
                  width: '100%', padding: '8px 12px', borderRadius: '8px', backgroundColor: styleConfig.inputBg,
                  border: `1px solid ${styleConfig.inputBorder}`, color: styleConfig.textPrimary, fontSize: '12px', outline: 'none', fontWeight: '600'
                }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: styleConfig.textSecondary, marginBottom: '6px' }}>
                {isRtl ? 'إرفاق ملف المستند (PDF)' : 'Attach Document (PDF)'}
              </label>
              
              <label style={{
                display: 'block',
                border: uploadedFile ? '2px dashed #10b981' : `2px dashed ${styleConfig.primaryBlue}`,
                borderRadius: '12px',
                padding: '24px 16px',
                textAlign: 'center',
                backgroundColor: uploadedFile 
                  ? (isDark ? 'rgba(16, 185, 129, 0.08)' : '#f0fdf4')
                  : (isDark ? 'rgba(37, 99, 235, 0.05)' : '#eff6ff'),
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      setUploadedFile(selectedFile);
                      handleUpload(selectedFile);
                    }
                  }} 
                />
                <div style={{ fontSize: '13px', fontWeight: '800', color: uploadedFile ? '#10b981' : styleConfig.primaryBlue, marginBottom: '4px' }}>
                  {uploadedFile 
                    ? `✓ تم إرفاق الملف: ${uploadedFile.name}` 
                    : (isRtl ? 'اسحب ملف الـ PDF هنا أو انقر للاختيار' : 'Drag & Drop PDF file here or click to browse')}
                </div>
                <div style={{ fontSize: '11px', color: styleConfig.textSecondary, fontWeight: '600' }}>
                  {uploadedFile 
                    ? (isRtl ? 'الملف جاهز الآن للمعالجة والأرشفة' : 'File ready for processing')
                    : (isRtl ? 'يدعم ملفات الخطط، التعديلات، ومحاضر الاجتماعات الرسمية' : 'Supports official plans, updates, and meeting minutes')}
                </div>
              </label>
            </div>

          </div>

        </form>

        {showResults && (
          <div style={{
            backgroundColor: styleConfig.cardBg,
            border: '1px solid #10b981',
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: styleConfig.shadow,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontSize: '15px', fontWeight: '900', color: styleConfig.textPrimary }}>
                  {isRtl ? 'نتائج استخراج البيانات والتحليل الأكاديمي' : 'Document Extraction & Analysis Results'}
                </span>
                <span style={{ padding: '3px 10px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontSize: '11px', fontWeight: '800' }}>
                  {isRtl ? 'دقة القراءة: 98.4%' : 'Accuracy: 98.4%'}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: styleConfig.textSecondary, fontWeight: '600' }}>
                {isRtl 
                  ? `التصنيف: ${selectedDocType} • الموعد النهائي: 01-11-2026 • الحالة: مطابقة كاملة لشروط الجودة`
                  : `Classification: ${selectedDocType} • Deadline: 01-11-2026 • Status: Fully Compliant`}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button 
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '10px 18px', borderRadius: '8px', backgroundColor: '#ef4444', color: '#fff',
                  fontSize: '12px', fontWeight: '800', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                }}
              >
                {isRtl ? 'إلغاء العملية' : 'Cancel Process'}
              </button>

              <button 
                type="button"
                onClick={() => window.location.href = '/document'}
                style={{
                  padding: '10px 20px', borderRadius: '8px', backgroundColor: '#10b981', color: '#fff',
                  fontSize: '12px', fontWeight: '800', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                }}
              >
                {isRtl ? 'تأكيد واعتماد الأرشفة النهائية ✓' : 'Confirm & Finalize Archiving ✓'}
              </button>
            </div>
          </div>
        )}

      </main>

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
        <div>{isRtl ? 'نظام أرشفة KASIT - وحدة الرفع والأرشفة' : 'KASIT Archive System - Upload Unit'}</div>
        <div style={{ fontWeight: '700' }}>
          {isRtl ? 'جميع الحقوق محفوظة © 2026 - الجامعة الأردنية' : 'All rights reserved © 2026 - The University of Jordan'}
        </div>
      </footer>

    </div>
  );
}