import { useState, useRef, useCallback } from 'react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Upload, PlusCircle, Trash2, CheckCircle, HelpCircle, X, FileDown, FileText } from 'lucide-react';
import { CATEGORIES, autoCategory } from './categories';
import { march2026Transactions } from './data/march2026';
import './App.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => currentYear - 2 + i);

function emptyRow() {
  return {
    id: crypto.randomUUID(),
    year: String(currentYear),
    month: MONTHS[new Date().getMonth()],
    expense: '',
    amount: '',
    category: '',
  };
}

// ── Pending-review modal ──────────────────────────────────────────────────────

function ReviewModal({ pending, onResolve, onSkip, onDismissAll }) {
  const item = pending[0];
  const [selectedCategory, setSelectedCategory] = useState('');

  if (!item) return null;

  const handleConfirm = () => {
    if (!selectedCategory) return;
    onResolve(item.id, selectedCategory);
    setSelectedCategory('');
  };

  const handleSkip = () => {
    onSkip(item.id);
    setSelectedCategory('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <HelpCircle size={20} className="icon-warning" />
          <h2>Categorize Transaction</h2>
          <button className="modal-close" onClick={onDismissAll} title="Dismiss all remaining">
            <X size={18} />
          </button>
        </div>

        <p className="modal-subtitle">
          {pending.length} transaction{pending.length > 1 ? 's' : ''} need{pending.length === 1 ? 's' : ''} your attention.
        </p>

        <div className="modal-transaction">
          <div className="tx-detail">
            <span className="tx-label">Description</span>
            <span className="tx-value">{item.expense}</span>
          </div>
          <div className="tx-detail">
            <span className="tx-label">Amount</span>
            <span className="tx-value tx-amount">${parseFloat(item.amount || 0).toFixed(2)}</span>
          </div>
          <div className="tx-detail">
            <span className="tx-label">Date</span>
            <span className="tx-value">{item.month} {item.year}</span>
          </div>
        </div>

        <div className="modal-categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-btn${selectedCategory === cat ? ' selected' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={handleSkip}>
            Skip (leave uncategorized)
          </button>
          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={!selectedCategory}
          >
            <CheckCircle size={16} /> Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [rows, setRows] = useState(march2026Transactions);
  const [pending, setPending] = useState([]);
  const [uploadMsg, setUploadMsg] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // ── Table editing ──

  const updateRow = (id, field, value) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addRow = () => setRows(prev => [...prev, emptyRow()]);

  const deleteRow = (id) => {
    setRows(prev => {
      const next = prev.filter(r => r.id !== id);
      return next.length ? next : [emptyRow()];
    });
  };

  // ── CSV parsing helpers ──

  function detectColumns(headers) {
    const h = headers.map(s => s.toLowerCase().trim());
    const descCandidates = ['description', 'transaction description', 'merchant', 'payee', 'name', 'details', 'memo', 'narrative', 'particulars'];
    const amtCandidates = ['amount', 'debit', 'charge', 'transaction amount', 'credit card charge'];
    const dateCandidates = ['date', 'transaction date', 'post date', 'posted date', 'trans date'];

    const find = (candidates) => {
      for (const c of candidates) {
        const idx = h.findIndex(col => col.includes(c));
        if (idx !== -1) return headers[idx];
      }
      return null;
    };

    return {
      descCol: find(descCandidates),
      amountCol: find(amtCandidates),
      dateCol: find(dateCandidates),
    };
  }

  function parseAmount(raw) {
    if (!raw) return '';
    const cleaned = raw.toString().replace(/[$,\s]/g, '').replace(/\(/g, '-').replace(/\)/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? '' : num.toFixed(2);
  }

  function parseDate(raw) {
    if (!raw) return { month: MONTHS[new Date().getMonth()], year: String(currentYear) };
    const d = new Date(raw);
    if (!isNaN(d.getTime())) {
      return { month: MONTHS[d.getMonth()], year: String(d.getFullYear()) };
    }
    const match = raw.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (match) {
      const m = parseInt(match[1]) - 1;
      const y = parseInt(match[3]);
      const year = y < 100 ? 2000 + y : y;
      return { month: MONTHS[Math.max(0, Math.min(11, m))], year: String(year) };
    }
    return { month: MONTHS[new Date().getMonth()], year: String(currentYear) };
  }

  // ── File processing ──

  const processCSV = useCallback((file) => {
    setUploadMsg(`Processing "${file.name}"…`);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const { data, meta } = results;
        if (!data.length) {
          setUploadMsg('The file appears to be empty.');
          return;
        }

        const { descCol, amountCol, dateCol } = detectColumns(meta.fields || []);

        if (!descCol || !amountCol) {
          setUploadMsg(
            `Could not auto-detect columns. Found headers: ${(meta.fields || []).join(', ')}. ` +
            `Please ensure your CSV has columns for description and amount.`
          );
          return;
        }

        const autoRows = [];
        const needsReview = [];

        data.forEach(row => {
          const desc = (row[descCol] || '').trim();
          const rawAmt = row[amountCol];
          const rawDate = dateCol ? row[dateCol] : '';

          if (!desc && !rawAmt) return;

          const amount = parseAmount(rawAmt);
          const { month, year } = parseDate(rawDate);
          const category = autoCategory(desc);

          const entry = {
            id: crypto.randomUUID(),
            year,
            month,
            expense: desc,
            amount,
            category: category || '',
          };

          if (category) {
            autoRows.push(entry);
          } else {
            needsReview.push(entry);
          }
        });

        setRows(prev => {
          // Keep existing rows that have data; append newly imported ones
          const nonEmpty = prev.filter(r => r.expense || r.amount || r.category);
          return [...nonEmpty, ...autoRows];
        });

        if (needsReview.length) {
          setPending(needsReview);
          setUploadMsg(
            `Imported ${autoRows.length} transaction(s) automatically. ` +
            `${needsReview.length} transaction(s) need your category selection.`
          );
        } else {
          setUploadMsg(`All ${autoRows.length} transaction(s) imported and categorized automatically.`);
        }
      },
      error: (err) => {
        setUploadMsg(`Parse error: ${err.message}`);
      },
    });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processCSV(file);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processCSV(file);
  };

  // ── Pending resolution ──

  const resolvePending = (id, category) => {
    const item = pending.find(p => p.id === id);
    if (item) setRows(prev => [...prev, { ...item, category }]);
    setPending(prev => prev.filter(p => p.id !== id));
  };

  const skipPending = (id) => {
    const item = pending.find(p => p.id === id);
    if (item) setRows(prev => [...prev, { ...item, category: '' }]);
    setPending(prev => prev.filter(p => p.id !== id));
  };

  const dismissAllPending = () => {
    setRows(prev => [...prev, ...pending.map(p => ({ ...p, category: '' }))]);
    setPending([]);
  };

  // ── Summary ──

  const totalByCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = rows
      .filter(r => r.category === cat)
      .reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
    return acc;
  }, {});

  const grandTotal = rows.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);

  // ── Exports ──

  const exportCSV = () => {
    const headers = ['Year', 'Month', 'Expense / Description', 'Amount ($)', 'Category'];
    const dataRows = rows.map(r => [
      r.year,
      r.month,
      `"${(r.expense || '').replace(/"/g, '""')}"`,
      r.amount,
      r.category,
    ]);
    // Summary block
    const summaryRows = CATEGORIES
      .filter(cat => totalByCategory[cat] !== 0)
      .map(cat => ['', '', `Summary: ${cat}`, totalByCategory[cat].toFixed(2), '']);
    summaryRows.push(['', '', 'GRAND TOTAL', grandTotal.toFixed(2), '']);

    const csvContent = [
      headers.join(','),
      ...dataRows.map(r => r.join(',')),
      '',
      'Category Summary',
      ...summaryRows.map(r => r.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'family_expenses.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(45, 55, 72);
    doc.text('Family Expense Tracker', pageWidth / 2, 16, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(113, 128, 150);
    doc.text(`Exported on ${new Date().toLocaleDateString()}`, pageWidth / 2, 22, { align: 'center' });

    // Main transactions table
    autoTable(doc, {
      startY: 28,
      head: [['Year', 'Month', 'Expense / Description', 'Amount ($)', 'Category']],
      body: rows.map(r => [
        r.year,
        r.month,
        r.expense || '',
        parseFloat(r.amount || 0).toFixed(2),
        r.category || '—',
      ]),
      foot: [['', '', 'Grand Total', grandTotal.toFixed(2), '']],
      headStyles: { fillColor: [49, 130, 206], textColor: 255, fontStyle: 'bold', fontSize: 9 },
      footStyles: { fillColor: [247, 250, 252], textColor: [45, 55, 72], fontStyle: 'bold' },
      bodyStyles: { fontSize: 8, textColor: [45, 55, 72] },
      alternateRowStyles: { fillColor: [247, 250, 252] },
      columnStyles: {
        0: { cellWidth: 18 },
        1: { cellWidth: 28 },
        2: { cellWidth: 110 },
        3: { cellWidth: 30, halign: 'right' },
        4: { cellWidth: 48 },
      },
      didParseCell: (data) => {
        // Highlight negative amounts (refunds) in red
        if (data.section === 'body' && data.column.index === 3) {
          const val = parseFloat(data.cell.raw);
          if (val < 0) data.cell.styles.textColor = [229, 62, 62];
        }
      },
    });

    // Category summary table
    const summaryData = CATEGORIES
      .filter(cat => totalByCategory[cat] !== 0)
      .map(cat => [cat, `$${totalByCategory[cat].toFixed(2)}`]);

    const afterTable = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setTextColor(45, 55, 72);
    doc.text('Spending Summary by Category', 14, afterTable);

    autoTable(doc, {
      startY: afterTable + 4,
      head: [['Category', 'Total']],
      body: summaryData,
      foot: [['Grand Total', `$${grandTotal.toFixed(2)}`]],
      headStyles: { fillColor: [49, 130, 206], textColor: 255, fontStyle: 'bold', fontSize: 9 },
      footStyles: { fillColor: [235, 248, 255], textColor: [43, 108, 176], fontStyle: 'bold' },
      bodyStyles: { fontSize: 9, textColor: [45, 55, 72] },
      alternateRowStyles: { fillColor: [247, 250, 252] },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 40, halign: 'right' },
      },
    });

    doc.save('family_expenses.pdf');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Family Expense Tracker</h1>
        <p className="app-subtitle">Track, categorize and review your monthly expenses</p>
      </header>

      {/* ── Upload zone ── */}
      <section className="upload-section">
        <div
          className={`drop-zone${dragOver ? ' drag-over' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <Upload size={28} />
          <span>Drop your credit card CSV here, or <strong>click to browse</strong></span>
          <span className="drop-hint">Supports standard bank/credit card CSV exports</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.tsv,.txt"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {uploadMsg && <div className="upload-msg">{uploadMsg}</div>}
      </section>

      {/* ── Expense Table ── */}
      <section className="table-section">
        <div className="table-header-row">
          <h2>Expenses</h2>
          <div className="table-header-actions">
            <button className="btn btn-export btn-sm" onClick={exportCSV} title="Download as CSV (opens in Excel)">
              <FileDown size={15} /> Export CSV
            </button>
            <button className="btn btn-export btn-sm" onClick={exportPDF} title="Download as PDF">
              <FileText size={15} /> Export PDF
            </button>
            <button className="btn btn-primary btn-sm" onClick={addRow}>
              <PlusCircle size={15} /> Add Row
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Expense / Description</th>
                <th>Amount ($)</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} className={!row.category ? 'row-uncategorized' : ''}>
                  <td>
                    <select value={row.year} onChange={e => updateRow(row.id, 'year', e.target.value)}>
                      {YEARS.map(y => <option key={y}>{y}</option>)}
                    </select>
                  </td>
                  <td>
                    <select value={row.month} onChange={e => updateRow(row.id, 'month', e.target.value)}>
                      {MONTHS.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.expense}
                      placeholder="Expense description"
                      onChange={e => updateRow(row.id, 'expense', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.amount}
                      placeholder="0.00"
                      step="0.01"
                      onChange={e => updateRow(row.id, 'amount', e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      value={row.category}
                      onChange={e => updateRow(row.id, 'category', e.target.value)}
                      className={!row.category ? 'unset' : ''}
                    >
                      <option value="">— Select category —</option>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </td>
                  <td>
                    <button className="icon-btn delete-btn" onClick={() => deleteRow(row.id)} title="Delete row">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td colSpan={3}><strong>Grand Total</strong></td>
                <td><strong>${grandTotal.toFixed(2)}</strong></td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* ── Summary ── */}
      {grandTotal > 0 && (
        <section className="summary-section">
          <h2>Spending Summary by Category</h2>
          <div className="summary-grid">
            {CATEGORIES.map(cat => (
              <div key={cat} className="summary-card">
                <span className="summary-cat">{cat}</span>
                <span className="summary-amt">${totalByCategory[cat].toFixed(2)}</span>
                {grandTotal > 0 && (
                  <div className="summary-bar-wrap">
                    <div
                      className="summary-bar"
                      style={{ width: `${Math.min(100, (totalByCategory[cat] / grandTotal) * 100)}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Review Modal ── */}
      {pending.length > 0 && (
        <ReviewModal
          pending={pending}
          onResolve={resolvePending}
          onSkip={skipPending}
          onDismissAll={dismissAllPending}
        />
      )}
    </div>
  );
}
