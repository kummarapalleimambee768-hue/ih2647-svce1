import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import {
  FolderLock,
  UploadCloud,
  FileText,
  Trash2,
  Eye,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  X
} from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const { t } = useTranslation();
  const { documents, uploadDocument, deleteDocument } = useApp();

  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [documentCategory, setDocumentCategory] = useState<'ultrasound' | 'lab_test' | 'prescription' | 'discharge_summary'>('ultrasound');
  const [notes, setNotes] = useState('');
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const dummyExtractedText =
      documentCategory === 'ultrasound'
        ? 'CLINICAL EXTRACTION (UNVERIFIED): Single live intrauterine pregnancy. Cephalic presentation. Normal amniotic fluid index. Cardiac activity documented.'
        : 'CLINICAL EXTRACTION (UNVERIFIED): Hemoglobin: 11.8 g/dL. Fasting Blood Sugar: 84 mg/dL. TSH: 1.82 mIU/L. Values within expected prenatal reference intervals.';

    uploadDocument({
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      fileType: file.type.includes('pdf') ? 'pdf' : 'image',
      documentCategory,
      notes: notes || 'Uploaded by mother for antenatal recordkeeping',
      aiExtractedText: dummyExtractedText,
      aiExtractionStatus: 'unverified',
      fileSizeKb: Math.round(file.size / 1024) || 1200,
    });

    setIsUploading(false);
    setFileName('');
    setNotes('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Private Medical Documents
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Encrypted storage for ultrasound scans, lab reports, and prescriptions. Strictly private to you.
          </p>
        </div>

        <button
          onClick={() => setIsUploading(!isUploading)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-all"
        >
          <UploadCloud className="w-4 h-4" />
          <span>{isUploading ? 'Cancel' : 'Upload Medical Report'}</span>
        </button>
      </div>

      {/* Strict Privacy Notice */}
      <div className="p-4 rounded-3xl bg-sage-50/70 border border-sage-200/80 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-sage-900 leading-relaxed">
          <strong>HIPAA & Clinical Confidentiality Safeguard:</strong> Uploaded medical documents are stored in your private vault. They are never shared with family members, and AI extractions are strictly marked as unverified administrative text—never automatic medical diagnoses.
        </div>
      </div>

      {/* Upload Dropzone Form */}
      {isUploading && (
        <div className="p-6 rounded-3xl bg-white border border-bloom-200 shadow-elevated space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-bloom-600" />
            <span>Upload New Clinical Document</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Document Category:
              </label>
              <select
                value={documentCategory}
                onChange={(e) => setDocumentCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs bg-white"
              >
                <option value="ultrasound">Ultrasound Sonography Scan Report</option>
                <option value="lab_test">Laboratory Test (Blood / Urine Panel)</option>
                <option value="prescription">Doctor Prescription / Medication Sheet</option>
                <option value="discharge_summary">Discharge Summary / Hospital Record</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Personal Notes / Summary:
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. 20-week TIFFA scan, normal anatomy"
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <label className="border-2 border-dashed border-bloom-200 hover:border-bloom-400 bg-bloom-50/30 hover:bg-bloom-50/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
            <input
              type="file"
              accept=".pdf,image/png,image/jpeg"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-bloom-600 mb-2">
              <UploadCloud className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">
              Select PDF or High-Resolution Medical Image
            </span>
            <span className="text-xs text-slate-500 mt-1">
              Supports PDF, PNG, JPG up to 25 MB
            </span>
          </label>
        </div>
      )}

      {/* Documents List */}
      <div className="space-y-4">
        {documents.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 text-center shadow-soft">
            <p className="text-xs text-slate-500">No medical documents stored yet.</p>
          </div>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                    <FileText className="w-5 h-5 text-bloom-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{doc.fileName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize bg-lavender-100 text-lavender-800">
                        {doc.documentCategory.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {doc.fileSizeKb} KB • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {doc.notes && (
                      <p className="text-xs text-slate-600 mt-1">{doc.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Report</span>
                  </button>
                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* AI Extraction Preview Badge */}
              {doc.aiExtractedText && (
                <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 text-xs text-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-bloom-700 flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" />
                      Unverified Administrative Extraction (For Mother's Review)
                    </span>
                    <span className="text-[10px] text-slate-400">Not a Diagnosis</span>
                  </div>
                  <p className="text-slate-800 font-mono text-[11px] leading-relaxed">
                    {doc.aiExtractedText}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Document View Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">{previewDoc.fileName}</h3>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Category: {previewDoc.documentCategory}</span>
                <span>Size: {previewDoc.fileSizeKb} KB</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed max-h-60 overflow-y-auto">
                <p className="font-bold text-slate-900 mb-2">Extracted Report Contents:</p>
                {previewDoc.aiExtractedText || 'No text content extracted for this scan.'}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
